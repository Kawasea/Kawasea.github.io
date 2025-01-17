$(function() {
    // 開始年月～終了年月までの全ての月をリスト化する共通関数
    function generateMonthsList(startYearMonth, endYearMonth) {
        const [startY, startM] = startYearMonth.split('-');
        const [endY, endM] = endYearMonth.split('-');
        const monthsList = [];

        let currentY = parseInt(startY);
        let currentM = parseInt(startM);
        const endYearVal = parseInt(endY);
        const endMonthVal = parseInt(endM);

        while (currentY < endYearVal || (currentY === endYearVal && currentM <= endMonthVal)) {
            monthsList.push([String(currentY), String(currentM).padStart(2, '0')]);
            currentM += 1;
            if (currentM > 12) {
                currentM = 1;
                currentY += 1;
            }
        }

        return monthsList;
    }

    // プロジェクト
    // プロジェクトのカテゴリー
    const map_develop_categories = new Map();
    //map_develop_categories.set('企画', 'planning');
    //map_develop_categories.set('要件定義', 'requirement_definition');
    map_develop_categories.set('基本設計', 'basic_design');
    map_develop_categories.set('詳細設計', 'specific_design');
    map_develop_categories.set('実装', 'implement');
    map_develop_categories.set('テスト', 'test');

    // 各プロジェクト
    const map_develops = new Map();
    map_develops.set(map_develops.size + 1, {
        'name' : 'コールセンターシステムのAWS移行',
        'type': 'iframe',
        'src' : 'components/develop/call-center-aws.html',
        'categories' : ['基本設計', '詳細設計', '実装'],
        'img' : 'call-center',
        'start_date' : '2025-01',
        'end_date' : null,
        });
    map_develops.set(map_develops.size + 1, {
        'name' : 'コールセンターシステムのDB浄化システムの開発',
        'type': 'iframe',
        'src' : 'components/develop/call-center-db-clean.html',
        'categories' : ['基本設計', '詳細設計', '実装', 'テスト'],
        'img' : 'call-center',
        'start_date' : '2025-08',
        'end_date' : '2025-10',
        });
    map_develops.set(map_develops.size + 1, {
        'name' : 'コールセンターシステムの改修',
        'type': 'iframe',
        'src' : 'components/develop/call-center.html',
        'categories' : ['基本設計', '詳細設計', '実装'],
        'img' : 'call-center',
        'start_date' : '2024-09',
        'end_date' : '2024-12',
        });
    map_develops.set(map_develops.size + 1, {
        'name' : '電子帳簿管理システムの開発2',
        'type': 'iframe',
        'src' : 'components/develop/e-archive2.html',
        'categories' : ['基本設計', '詳細設計', '実装'],
        'img' : 'e-archive',
        'start_date' : '2024-06',
        'end_date' : '2024-08',
        });
    map_develops.set(map_develops.size + 1, {
        'name' : '福祉系の媒体管理システムのリニューアル',
        'type': 'iframe',
        'src' : 'components/develop/welfare-media.html',
        'categories' : ['詳細設計', '実装'],
        'img' : 'welfare-media',
        'start_date' : '2024-01',
        'end_date' : '2024-05',
        });
    map_develops.set(map_develops.size + 1, {
        'name' : '工業系の資格検定管理システムの再構築',
        'type': 'iframe',
        'src' : 'components/develop/industry-certification.html',
        'categories' : ['詳細設計', '実装'],
        'img' : 'industry-certification',
        'start_date' : '2023-04',
        'end_date' : '2023-12',
        });
    map_develops.set(map_develops.size + 1, {
        'name' : '電子帳簿管理システムの開発',
        'type': 'iframe',
        'src' : 'components/develop/e-archive.html',
        'categories' : ['詳細設計', '実装', 'テスト'],
        'img' : 'e-archive',
        'start_date' : '2022-02',
        'end_date' : '2023-01',
        });
    map_develops.set(map_develops.size + 1, {
        'name' : 'CM広告枠の販売管理システムの開発',
        'type': 'iframe',
        'src' : 'components/develop/commercial-deal.html',
        'categories' : ['基本設計', '詳細設計', '実装'],
        'img' : 'commercial-deal',
        'start_date' : '2022-10',
        'end_date' : '2023-05',
        });
    map_develops.set(map_develops.size + 1, {
        'name' : '保育者向けeラーニングシステムの開発',
        'type': 'iframe',
        'src' : 'components/develop/daycare-e-learning.html',
        'categories' : ['詳細設計', '実装'],
        'img' : 'daycare-e-learning',
        'start_date' : '2022-04',
        'end_date' : '2022-05',
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

    // 表示切り替えボタンの配置
    const develop_view_toggle = $('.develop-view-toggle');
    develop_view_toggle.append(
        '<button class="button-view-toggle button-view-timeline active" title="タイムライン表示">'
            + '<i class="fas fa-bars"></i>'
            + '</button>'
            + '<button class="button-view-toggle button-view-card" title="カード表示">'
            + '<i class="fas fa-th"></i>'
            + '</button>'
    );

    const develop_box = $('.develop-box');
    function categoryFilter() {
        // カード一覧のフィルタリング
        develops.hide();
        let target_categories = develop_category.find('[class*="' + target + '"]');
        target_categories.each(function(_, target_category) {
            let target_develops = develop_box.find('[class*="' + $(target_category).attr('id') + '"]');
            target_develops.show();
        });

        // タイムラインのフィルタリング
        // 選択されたカテゴリーの配列を取得（value属性でカテゴリー名を取得）
        let selectedCategories = [];
        target_categories.each(function(_, target_category) {
            let categoryName = $(target_category).attr('value');
            selectedCategories.push(categoryName);
        });

        // 選択されたカテゴリーに応じてレンダリング
        renderTimelineProjects(selectedCategories);
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
        // タイムラインもリセット（全カテゴリーを渡す）
        let allCategories = [];
        for (const [category_name, category_class] of map_develop_categories) {
            allCategories.push(category_name);
        }
        renderTimelineProjects(allCategories);
    }

    // プロジェクトの配置
    for (const [_, develop] of map_develops) {
        let categories = '';
        let tags = '';
        let img = '';
        for (const category of develop['categories']) {
            const category_val = map_develop_categories.get(category);
            categories += category_val + ' ';
            tags += '<span class="' + category_val + '"></span>';
        }
        img = develop['img'];
        develop_box.append(
            '<label class="card modal-open ' + categories + '">'
                + '<div class="card-imgframe ' + img + '"></div>'
                + '<div class="card-titletext">' + develop['name'] + '</div>'
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

    // 縦型タイムライン表示用
    const timeline_axis = $('.timeline-axis');
    const timeline_projects = $('.timeline-projects');
    const timeline_items = [];

    // タイムラインの粒度（2半期、4半期、毎月）
    const TIMELINE_GRANULARITY = 'quarter'; // 'half-year' | 'quarter' | 'monthly'

    // 粒度ごとのプロット月を定義
    const PLOT_MONTHS = {
        'half-year': [1, 6, 12],
        'quarter': [1, 3, 6, 9, 12],
        'monthly': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    };

    // 日付情報を取得
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = String(now.getMonth() + 1).padStart(2, '0');
    const currentYearMonth = currentYear + '-' + currentMonth;

    // 最古と最新の年月を取得
    let minYearMonth = null;
    let maxYearMonth = null;

    for (const [_, develop] of map_develops) {
        const startDate = develop['start_date'];

        // 比較用の終了年月を準備
        let comparisonYearMonth;
        if (develop['end_date']) {
            // end_dateが存在する場合：+1ヶ月
            const [endYear, endMonth] = develop['end_date'].split('-');
            let nextMonth = parseInt(endMonth) + 1;
            let nextYear = parseInt(endYear);
            if (nextMonth > 12) {
                nextMonth = 1;
                nextYear += 1;
            }
            comparisonYearMonth = nextYear + '-' + String(nextMonth).padStart(2, '0');
        } else {
            // end_dateがnullの場合：currentYearMonthをそのまま使う
            comparisonYearMonth = currentYearMonth;
        }

        if (minYearMonth === null || startDate < minYearMonth) {
            minYearMonth = startDate;
        }
        if (maxYearMonth === null || comparisonYearMonth > maxYearMonth) {
            maxYearMonth = comparisonYearMonth;
        }
    }

    // プロジェクトをタイムライン用データに変換（monthsListを含む）
    for (const [_, develop] of map_develops) {
        // このプロジェクト用の終了年月を決定（monthsList用）
        let projectEndYearMonth;
        if (develop['end_date']) {
            // end_dateが存在する場合：そのまま使う
            projectEndYearMonth = develop['end_date'];
        } else {
            // end_dateがnullの場合：currentYearMonthをそのまま使う
            projectEndYearMonth = currentYearMonth;
        }

        // このプロジェクト用の月リストを生成
        const monthsList = generateMonthsList(develop['start_date'], projectEndYearMonth);

        timeline_items.push({
            name: develop['name'],
            start_date: develop['start_date'],
            end_date: develop['end_date'],
            categories: develop['categories'],
            type: develop['type'],
            src: develop['src'],
            monthsList: monthsList
        });
    }

    // プロット月のリストを取得
    const plotMonths = PLOT_MONTHS[TIMELINE_GRANULARITY];

    // 最古と最新の年月を分解
    const [minYearVal, minMonthVal] = minYearMonth.split('-');
    const [maxYearVal, maxMonthVal] = maxYearMonth.split('-');

    // 最古年月～最新年月までの全ての月をリスト化
    const allMonthsList = generateMonthsList(minYearMonth, maxYearMonth);

    // 最大レーン数を計算（各月での最大プロジェクト数）
    let maxLaneCount = 1;
    for (const [yearStr, monthStr] of allMonthsList) {
        let projectCountInMonth = 0;
        for (const item of timeline_items) {
            // このプロジェクトがこの月に存在するかチェック
            let projectExists = false;
            for (const [projYear, projMonth] of item.monthsList) {
                if (projYear === yearStr && projMonth === monthStr) {
                    projectExists = true;
                    break;
                }
            }
            if (projectExists) {
                projectCountInMonth++;
            }
        }
        if (projectCountInMonth > maxLaneCount) {
            maxLaneCount = projectCountInMonth;
        }
    }

    // 年ごとにグループ化して表示
    const yearMonthsMap = {};
    for (const [year, month] of allMonthsList) {
        if (!yearMonthsMap[year]) {
            yearMonthsMap[year] = [];
        }
        yearMonthsMap[year].push(parseInt(month));
    }

    // timeline-axis生成関数
    function renderTimelineAxis() {
        // allMonthsListを逆順でループして、表示用のHTMLを生成＆月の位置情報を計算
        const monthHtmlMap = {}; // 'YYYY-MM' -> monthのHTML
        const monthPositions = {}; // 'YYYY-MM' -> { index, top: 累積高さ }
        const MONTH_HEIGHT = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--timeline-month-height'));
        const MONTH_GAP = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--timeline-month-gap'));
        let cumulativeFromBottom = 0;

        for (let i = allMonthsList.length - 1; i >= 0; i--) {
            const [yearStr, monthStr] = allMonthsList[i];
            const year = parseInt(yearStr);
            const month = parseInt(monthStr);
            const yearMonth = year + '-' + String(month).padStart(2, '0');

            // 最古年月の場合は必ず表示
            const isMinMonth = (year === parseInt(minYearVal) && month === parseInt(minMonthVal));
            // 最新年月の場合は必ず表示
            const isMaxMonth = (year === parseInt(maxYearVal) && month === parseInt(maxMonthVal));
            // 周期に従うかチェック
            const isPlotMonth = plotMonths.includes(month);
            const shouldDisplay = isMinMonth || isMaxMonth || isPlotMonth;

            // 全ての月に高さを確保、ラベル表示は条件に従う
            let html = '<div class="timeline-plot-group" data-year-month="' + yearMonth + '">';
            if (shouldDisplay) {
                html += '<div class="timeline-plot-label">' + month + '月</div>';
            }
            html += '</div>';

            monthHtmlMap[yearMonth] = html;

            // この月の位置情報を記録（上から積み上げていく）
            monthPositions[yearMonth] = {
                index: i,
                top: cumulativeFromBottom
            };

            cumulativeFromBottom += MONTH_HEIGHT;
        }

        // 最新から古い順で表示（yearMonthsMapを使って元々の順序を保つ）
        let timelineHtml = '';
        const yearsToShow = Object.keys(yearMonthsMap).map(y => parseInt(y)).sort((a, b) => b - a);

        for (const year of yearsToShow) {
            const monthsInYear = yearMonthsMap[year].sort((a, b) => b - a);
            let yearContent = '';

            for (const month of monthsInYear) {
                const yearMonth = year + '-' + String(month).padStart(2, '0');
                yearContent += monthHtmlMap[yearMonth] || '';
            }

            timelineHtml += '<div class="timeline-year-section">'
                + '<div class="timeline-year-label">' + year + '年</div>'
                + '<div class="timeline-year-content">' + yearContent + '</div>'
                + '</div>';
        }

        // 軸を描画
        timeline_axis.html(timelineHtml);
    }

    // 動的レーン管理：各月ごとに使用中のレーンを追跡
    const monthLaneUsage = {}; // 'YYYY-MM' -> Set of used lane numbers
    const projectLaneMap = {}; // プロジェクト名 -> レーン番号のマッピング

    // 全ての月に対してレーン使用情報を初期化
    for (const [yearStr, monthStr] of allMonthsList) {
        const yearMonth = yearStr + '-' + monthStr;
        monthLaneUsage[yearMonth] = new Set();
    }

    // プロジェクトをループして、開始月のレーン割り当てを決定
    for (const item of timeline_items) {
        const startDate = item.start_date;

        // 開始月で最初に空いているレーンを見つける
        let assignedLane = 0;
        for (let lane = 0; lane < maxLaneCount; lane++) {
            if (!monthLaneUsage[startDate].has(lane)) {
                assignedLane = lane;
                break;
            }
        }

        projectLaneMap[item.name] = assignedLane;

        // このプロジェクトの全ての月にレーンを記録
        for (const [yearStr, monthStr] of item.monthsList) {
            const yearMonth = yearStr + '-' + monthStr;
            monthLaneUsage[yearMonth].add(assignedLane);
        }
    }

    // timeline-projects生成関数（filterCategoriesが指定された場合のみ該当カテゴリーを表示）
    function renderTimelineProjects(filterCategories) {
        const MONTH_HEIGHT = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--timeline-month-height'));
        const MONTH_GAP = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--timeline-month-gap'));
        const squareHeight = MONTH_HEIGHT - MONTH_GAP;
        const LABEL_FONT_SIZE = (squareHeight * 0.8) + 'px';

        // 月ごとのコンテナをHTML化（上から下へ新しい月から古い月）
        let projectsHtml = '';
        for (let i = allMonthsList.length - 1; i >= 0; i--) {
            const [yearStr, monthStr] = allMonthsList[i];
            const yearMonth = yearStr + '-' + monthStr;
            projectsHtml += '<div class="timeline-month-container" data-year-month="' + yearMonth + '" style="height: ' + MONTH_HEIGHT + 'px; position: relative;"></div>';
        }
        timeline_projects.html(projectsHtml);

        // プロジェクトごとの色を定義
        const projectColors = [
            '#667eea', // 青紫
            '#764ba2', // 紫
            '#4facfe', // 青
            '#fa709a'  // ピンク赤
        ];

        // 全プロジェクトを描画
        for (let i = 0; i < timeline_items.length; i++) {
            const item = timeline_items[i];

            // このプロジェクトが該当カテゴリーを持っているかチェック
            let hasMatchingCategory = false;
            for (const category of item.categories) {
                if (filterCategories.includes(category)) {
                    hasMatchingCategory = true;
                    break;
                }
            }
            // 該当カテゴリーがない場合はスキップ
            if (!hasMatchingCategory) {
                continue;
            }

            const projectLane = projectLaneMap[item.name];
            const projectColor = projectColors[i % projectColors.length];

            const lastMonthIndex = item.monthsList.length - 1;
            let monthIndex = 0;

            // プロジェクトの月リストをループして、各月に四角形を描画
            for (const [yearStr, monthStr] of item.monthsList) {
                const yearMonth = yearStr + '-' + monthStr;
                const $monthContainer = timeline_projects.find('[data-year-month="' + yearMonth + '"]');

                if ($monthContainer.length > 0) {
                    // 四角形を作成（relativeで配置）
                    const $square = $('<div class="project-square" style="position: absolute; left: ' + (40 + projectLane * 30) + 'px; width: 20px; height: ' + squareHeight + 'px; background: ' + projectColor + '; border: 1px solid ' + projectColor + ';"></div>');
                    $monthContainer.append($square);

                    // 終了月の場合、線とラベルを描画
                    if (monthIndex === lastMonthIndex) {
                        const squareRight = 40 + projectLane * 30 + 20; // 四角の右端
                        const squareCenter = squareHeight / 2; // コンテナ内での中央

                        // 線を作成
                        const $line = $('<div style="position: absolute; top: ' + squareCenter + 'px; left: ' + squareRight + 'px; width: 50px; height: 2px; background: ' + projectColor + ';"></div>');
                        $monthContainer.append($line);

                        // ラベルを作成（吹き出しスタイル）
                        const $label = $('<div class="timeline-project-label" data-project-name="' + item.name + '" style="position: absolute; top: ' + (squareCenter - squareHeight / 2) + 'px; left: ' + (squareRight + 50) + 'px; height: ' + squareHeight + 'px; display: flex; align-items: center; font-size: ' + LABEL_FONT_SIZE + '; color: #fff; background: ' + projectColor + '; padding: 2px 8px; border-radius: 4px; white-space: nowrap; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">' + item.name + '</div>');
                        $monthContainer.append($label);
                    }
                }

                monthIndex++;
            }
        }
    }

    // 軸を初回描画
    renderTimelineAxis();

    // 初期状態（全カテゴリー）をリセット
    resetCategory();

    // 表示切り替えボタンの変数定義
    const button_view_card = $('.button-view-card');
    const button_view_timeline = $('.button-view-timeline');
    const develop_timeline = $('.develop-timeline');

    // 初期表示状態：タイムライン表示、カード表示非表示
    develop_box.hide();
    button_view_timeline.addClass('active');

    // 表示切り替えボタンのクリックイベント

    button_view_card.on('click', function() {
        develop_box.show();
        develop_timeline.hide();
        button_view_card.addClass('active');
        button_view_timeline.removeClass('active');
    });

    button_view_timeline.on('click', function() {
        develop_box.hide();
        develop_timeline.show();
        button_view_timeline.addClass('active');
        button_view_card.removeClass('active');
    });

    // ウィンドウリサイズ時にタイムラインを再描画
    let resizeTimer;
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // 現在のカテゴリーフィルター状態を取得
            let selectedCategories = [];
            let target_categories = develop_category.find('[class*="' + target + '"]');
            target_categories.each(function(_, target_category) {
                let categoryName = $(target_category).attr('value');
                selectedCategories.push(categoryName);
            });

            // タイムライン軸とプロジェクトを再描画
            renderTimelineAxis();
            renderTimelineProjects(selectedCategories.length > 0 ? selectedCategories : []);
        }, 250);
    });

    // タイムラインラベルのクリックイベント
    timeline_projects.on('click', '.timeline-project-label', function(e) {
        e.stopPropagation();
        const projectName = $(this).data('project-name');
        // プロジェクト名から対応するプロジェクトオブジェクトを特定
        for (const [_, develop] of map_develops) {
            if (develop.name === projectName) {
                // プロジェクトカードと同じ方法でモーダルを開く
                const type = develop.type;
                const src = develop.src;
                if (type == 'link') {
                    window.open(src, '_blank');
                } else if (type == 'iframe') {
                    $('body').addClass('stop-scroll');
                    const $modalContainer = $('.modal-container');
                    $modalContainer.addClass('active');
                    $modalContainer.find('iframe').attr('src', src + '?embed=true');
                }
                break;
            }
        }
    });
});