import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * [Cron] /api/cron/daily-jump-tasks (P10 선수존)
 *
 * ⚠ 잔액 처리(30일 reset / 프리미엄 +1 / auto_remaining_today reset)는
 *    P2 코코알바 cron(`coco-universe`)에서 일괄 처리하여 중복 적립 방지.
 *    P10은 자기 platform='sunsuzone' 광고의 자동 점프 사용만 담당.
 */

function getAdmin() {
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceKey) return null;
    return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey);
}

export async function GET(request: Request) {
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabaseAdmin = getAdmin();
    if (!supabaseAdmin) {
        return NextResponse.json({ error: 'Supabase admin not configured' }, { status: 503 });
    }

    const nowIso = new Date().toISOString();
    let auto_jumped = 0;

    try {
        const { data: shopsData } = await supabaseAdmin
            .from('shops')
            .select('id, user_id, platform, options')
            .eq('platform', 'sunsuzone')
            .neq('status', 'CLOSED')
            .neq('status', 'closed')
            .neq('status', 'rejected')
            .neq('status', 'REJECTED');

        for (const shop of shopsData ?? []) {
            const opts = shop.options || {};
            if (!opts.auto_jump_enabled) continue;

            const { data: uj } = await supabaseAdmin
                .from('user_jumps')
                .select('auto_remaining_today')
                .eq('user_id', shop.user_id)
                .maybeSingle();

            if (!uj || (uj.auto_remaining_today ?? 0) <= 0) continue;

            await supabaseAdmin
                .from('shops')
                .update({
                    created_at: nowIso,
                    updated_at: nowIso,
                    last_jumped_at: nowIso,
                })
                .eq('id', shop.id);

            await supabaseAdmin
                .from('user_jumps')
                .update({
                    auto_remaining_today: (uj.auto_remaining_today ?? 1) - 1,
                    updated_at: nowIso,
                })
                .eq('user_id', shop.user_id);

            auto_jumped++;
        }

        return NextResponse.json({
            success: true,
            platform: 'sunsuzone',
            auto_jumped,
            note: '잔액 처리는 P2 cron이 담당',
        });
    } catch (err: any) {
        console.error('[daily-jump-tasks][P10] Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
