if ('jquery' in ($() || {})) {
    setTimeout(() => {
        let isCtrlKeyDown = false;

        $('body').on('keydown', (event) => {
            isCtrlKeyDown = event.ctrlKey || event.metaKey;
        });

        $('body').on('keyup', (event) => {
            isCtrlKeyDown = event.ctrlKey || event.metaKey;
        });

        $('body.o_web_client[data-debug-mode=1]').on('DOMNodeInserted', '.tooltip', () => {
            const title = $('.oe_tooltip_string').text().replace(/\s{2,}/g, ' ').trim();
            if (!isCtrlKeyDown) {
                console.log('----------------');
                console.log(title);
            }

            let result = {};

            $('.tooltip-inner > .oe_tooltip_technical > li:not([data-item="selection"])').each(function () {
                const content = $(this).text().replace(/\s{2,}/g, '').split(/:(.+)/);

                result[content[0]] = content[1];
            });

            if (isCtrlKeyDown) {
                console.log(result.Field);
                return;
            }

            console.table(result);

            $('.tooltip-inner > .oe_tooltip_technical > li[data-item="selection"] > .oe_tooltip_technical > li').each(function () {
                if (!('Selections' in result)) {
                    result.Selections = {};
                }

                const content = $(this).text().replace(/\s{2,}/g, ' ').split(/-(.+)/);

                result.Selections[content[0].replace(/\[|\]/g, '').trim()] = content[1].trim();
            });

            if (result.Selections) {
                console.log(title + ' selections:');
                console.table(result.Selections);
            }
        });
    }, 2000);
}
