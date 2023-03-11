$(function() {
    // プロジェクト
    // プロジェクトのカテゴリー
    const map_develop_categories = new Map();
    //map_develop_categories.set('企画', 'planning');
    //map_develop_categories.set('要件定義', 'requirement_definition');
    map_develop_categories.set('基本設計', 'basic_design');
    map_develop_categories.set('詳細設計', 'specific_design');
    map_develop_categories.set('実装', 'implement');
    map_develop_categories.set('テスト', 'test');
    map_develop_categories.set('個人開発', 'personal');

    // 各プロジェクト
    const map_develops = new Map();
    map_develops.set('1', {
        'name' : '電子帳簿管理システムの開発',
        'type': 'iframe',
        'src' : 'https://docs.google.com/presentation/d/e/2PACX-1vRCyzlley8ONfzlPSnkMID84tGpDzT-Yh8JWoW4Ceu-yrisSKNOj5C4scCSDqDG_SupJDXffzxFt_OB/embed',
        'categories' : ['詳細設計', '実装', 'テスト'],
        'img' : 'e-archive',
        });
    map_develops.set('2', {
        'name' : '保育者向けeラーニングシステムの開発',
        'type': 'iframe',
        'src' : 'https://docs.google.com/presentation/d/e/2PACX-1vSKYhMqqfHaHf20SDCRgB1kGZe99jq05fT983wBIPwa23OcmPlPynl_rINTN0Ht6IWtkGbCTVSUtrhB/embed',
        'categories' : ['詳細設計', '実装'],
        'img' : 'daycare-e-learning',
        });
    map_develops.set('3', {
        'name' : '文具系の問い合わせフォームの開発',
        'type': 'iframe',
        'src' : 'https://docs.google.com/presentation/d/e/2PACX-1vTOCP12sD30s2KICcSBBCLh1zX4AqdK4EiZTn0Mt30ybo3J9TdB_s5nL4fJVnMwUABm6vd20dca-vbe/embed',
        'categories' : ['詳細設計', '実装', 'テスト'],
        'img' : 'stationery-form',
        });
    map_develops.set('4', {
        'name' : 'ゲームDLC用のWEBページの制作',
        'type': 'iframe',
        'src' : 'https://docs.google.com/presentation/d/e/2PACX-1vQTcu-s3ggE3rxCAeK_GC6R-n8euBW6BzPO8UiXS9gzOpoVPk5BC-kBvbDVGwW6gx3NhVowY9HSvWOq/embed',
        'categories' : ['実装'],
        'img' : 'game-dlc',
        });
    map_develops.set('5', {
        'name' : 'サンプル開発',
        'type': 'iframe',
        'src' : 'https://docs.google.com/presentation/d/e/2PACX-1vQ7RyV2H0f2Ypyt8FJldhTvwLELoxBNR8zBIWWMIYkd7FCznwvpXI-PeWGjCEMJZ582po9zzE0ALv0-/embed',
        'categories' : ['個人開発'],
        'img' : 'sample-develop',
        });
    
    // カテゴリーボタンの配置
    const develop_category = $('.develop-category');
    const target = 'target-category';
    for (const [category_name, category_class] of map_develop_categories) {
        develop_category.append(
            '<input type="button"'
                + 'class="button-category ' + target + '"'
                + 'id="' + category_class + '"'
                + 'value="' + category_name + '"'
                + '>'
        );
    }
    develop_category.append(
        '<input type="button"'
            + 'class="button-category-reset"'
            + 'value="リセット"'
            + '>'
    );

    const develop_box = $('.develop-box');
    function categoryFilter() {
        develops.hide();
        let target_categories = develop_category.find('[class*="' + target + '"]');
        target_categories.each(function(ind, target_category) {
            let target_develops = develop_box.find('[class*="' + $(target_category).attr('id') + '"]');
            target_develops.show();
        });
    }
    function categoryPush(e) {
        if ($(e.target).attr('class').includes(target)) {
            $(e.target).removeClass(target);
        } else {
            $(e.target).attr('class', 'button-category ' + target + '');
        }
        categoryFilter();
    }
    function resetCategory() {
        button_category.attr('class', 'button-category ' + target + '');
        develops.show();
    }

    // プロジェクトの配置
    let categories;
    let tags;
    let img;
    for (const [key, develop] of map_develops) {
        categories = '';
        tags ='';
        img = '';
        for (const category of develop['categories']) {
            category_val = map_develop_categories.get(category);
            categories += category_val + ' ';
            tags += '<span class="' + category_val + '"></span>';
        }
        img = develop['img'];
        develop_box.append(
            '<label class="card modal-open ' + categories + '">'
                + '<div class="card-imgframe ' + img + '"></div>'
                + '<h3 class="card-titletext">' + develop['name'] + '</h3>'
                + '<p class="card-overviewtext">' + tags + '</p>'
                + '<div class="type" style="display:none;">' + develop['type'] + '</div>'
                + '<div class="src" style="display:none;">' + develop['src'] + '</div>'
            + '</label>'
        );
    }
    const develops = develop_box.find('[class*="modal-open"]');
    const button_category = $('.button-category');
    const button_category_reset = $('.button-category-reset');
    button_category.on('click', categoryPush);
    button_category_reset.on('click', resetCategory);
    resetCategory();
});