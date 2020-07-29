if ('jquery' in ($() || {})) {
    setTimeout(() => {
        $('body.o_web_client[data-debug-mode=1]').on('DOMNodeInserted', '.tooltip', () => {
            const title = $('.oe_tooltip_string').text().replace(/\s{2,}/g, ' ').trim();
            console.log('----------------');
            console.log(title);

            let result = {};

            $('.tooltip-inner > .oe_tooltip_technical > li:not([data-item="selection"])').each(function () {
                const content = $(this).text().replace(/\s{2,}/g, '').split(/:(.+)/);

                result[content[0]] = content[1];
            });

            console.table(result);

            $('.tooltip-inner > .oe_tooltip_technical > li[data-item="selection"] > .oe_tooltip_technical > li').each(function () {
                if (!('Selections' in result)) {
                    result.Selections = {};
                }

                const content = $(this).text().replace(/\s{2,}/g, ' ').split(/-(.+)/);

                result.Selections[content[0].replace(/\[|\]/g, '').trim()] = content[1].trim();
            });

            console.log(title + ' selections:');
            console.table(result.Selections);
        });
    }, 2000);
}
