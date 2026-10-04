// ==UserScript==
// @name         Z-lib Booklist Enhancer
// @namespace    local.booklist-enhancer
// @version      3.1.0-dev
// @description  增强书单信息显示、筛选与当前加载进度
// @match        https://z-lib.sk/*
// @match        https://z-library.sk/*
// @match        https://1lib.sk/*
// @match        https://libb.la/*
// @match        https://z-library.im/*
// @match        https://z-lib.fm/*
// @noframes
// @run-at       document-start
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        unsafeWindow
// @grant        GM_openInTab
// @grant        window.onurlchange
// ==/UserScript==

(() => {
  'use strict';

  const KNOWN_FORMATS = new Set(['pdf', 'epub', 'azw3', 'mobi']);
  const KNOWN_HOSTS = new Set(['z-lib.sk', 'z-library.sk', '1lib.sk', 'libb.la', 'z-library.im', 'z-lib.fm']);
  const PAGE_SIZE = 20;
  const SETTING_FORMATS = new Set([...KNOWN_FORMATS, 'other', 'custom']);
  const DEFAULT_SETTINGS = Object.freeze({
    showFormat: true,
    filterFormat: false,
    filterDownload: false,
    formats: [],
    custom: '',
    downloadRule: 'not-downloaded',
    showLanguage: true,
    showYear: true,
    showFullTitle: false,
    showFullAuthor: false,
    filterYear: false,
    yearMin: '',
    yearMax: '',
    includeMissingYear: false,
    panelDock: null,
    uiLanguage: 'auto',
  });

  const LOCALES = ['en', 'zh-CN', 'zh-TW', 'fr', 'de', 'ru', 'ja', 'ko', 'es', 'pt-BR'];
  // Entries are ordered as LOCALES. Keep one complete row per tool-owned message.
  const MESSAGES = {
    'section.filters': ['Filters', '筛选器', '篩選器', 'Filtres', 'Filter', 'Фильтры', 'フィルター', '필터', 'Filtros', 'Filtros'],
    'section.info': ['Information display', '信息显示', '資訊顯示', 'Affichage des informations', 'Informationsanzeige', 'Отображение сведений', '情報表示', '정보 표시', 'Información visible', 'Exibição de informações'],
    'section.automation': ['Automation (beta)', '自动化（beta）', '自動化（beta）', 'Automatisation (bêta)', 'Automatisierung (Beta)', 'Автоматизация (бета)', '自動化（ベータ）', '자동화(베타)', 'Automatización (beta)', 'Automação (beta)'],
    'section.settings': ['Settings', '设置', '設定', 'Paramètres', 'Einstellungen', 'Настройки', '設定', '설정', 'Configuración', 'Configurações'],
    'section.configuration': ['Filter configuration', '筛选配置', '篩選配置', 'Configuration du filtre', 'Filterkonfiguration', 'Настройка фильтра', 'フィルター設定', '필터 구성', 'Configuración del filtro', 'Configuração do filtro'],
    'section.about': ['About', '关于', '關於', 'À propos', 'Über', 'О проекте', 'このツールについて', '정보', 'Acerca de', 'Sobre'],
    'about.description': ['Flexible filtering, clearer information and optional automation for Z-Library booklists.', '为 Z-Library 书单提供灵活筛选、信息显示和自选自动化操作。', '為 Z-Library 書單提供靈活篩選、資訊顯示與自選自動化操作。', 'Filtres, informations et automatisation facultative pour les listes Z-Library.', 'Flexible Filter, bessere Informationen und optionale Automatisierung für Z-Library-Listen.', 'Фильтры, сведения и необязательная автоматизация для списков Z-Library.', 'Z-Library の書籍リストに絞り込み、情報表示、任意の自動操作を追加します。', 'Z-Library 책 목록에 필터, 정보 표시, 선택적 자동화를 제공합니다.', 'Filtros, información y automatización opcional para listas de Z-Library.', 'Filtros, informações e automação opcional para listas do Z-Library.'],
    'about.developer': ['Developer', '开发者', '開發者', 'Développeur', 'Entwickler', 'Разработчик', '開発者', '개발자', 'Desarrollador', 'Desenvolvedor'],
    'about.github': ['GitHub page', 'GitHub 页面', 'GitHub 頁面', 'Page GitHub', 'GitHub-Seite', 'Страница GitHub', 'GitHub ページ', 'GitHub 페이지', 'Página de GitHub', 'Página no GitHub'],
    'about.placeholder': ['To be added', '待填写', '待填寫', 'À renseigner', 'Noch offen', 'Будет добавлено', '未記入', '추후 입력', 'Pendiente', 'A preencher'],
    'control.formatBadge': ['File format badge', '文件格式标签', '檔案格式標籤', 'Étiquette du format', 'Dateiformat-Label', 'Метка формата файла', 'ファイル形式ラベル', '파일 형식 배지', 'Etiqueta de formato', 'Etiqueta do formato'],
    'control.language': ['Book language (from site)', '书籍语言（页面自带）', '書籍語言（頁面自帶）', 'Langue du livre (site)', 'Buchsprache (von der Seite)', 'Язык книги (на странице)', '書籍の言語（サイト表示）', '책 언어(사이트 제공)', 'Idioma del libro (del sitio)', 'Idioma do livro (do site)'],
    'control.year': ['Book year (from site)', '书籍年份（页面自带）', '書籍年份（頁面自帶）', 'Année du livre (site)', 'Buchjahr (von der Seite)', 'Год книги (на странице)', '書籍の年（サイト表示）', '책 연도(사이트 제공)', 'Año del libro (del sitio)', 'Ano do livro (do site)'],
    'control.fullTitle': ['Show full long titles', '完整显示超长书名', '完整顯示過長書名', 'Afficher les titres longs en entier', 'Lange Titel vollständig anzeigen', 'Показывать длинные названия полностью', '長い書名を全文表示', '긴 책 제목 전체 표시', 'Mostrar títulos largos completos', 'Mostrar títulos longos completos'],
    'control.fullAuthor': ['Show full long author names', '完整显示超长作者名', '完整顯示過長作者名稱', 'Afficher les noms d’auteur longs en entier', 'Lange Autorennamen vollständig anzeigen', 'Показывать длинные имена авторов полностью', '長い著者名を全文表示', '긴 저자 이름 전체 표시', 'Mostrar nombres de autor largos completos', 'Mostrar nomes longos de autores completos'],
    'control.filterFormat': ['Only selected file formats', '只显示指定文件格式', '只顯示指定檔案格式', 'Afficher uniquement les formats choisis', 'Nur ausgewählte Dateiformate', 'Только выбранные форматы', '指定したファイル形式のみ表示', '선택한 파일 형식만 표시', 'Solo formatos seleccionados', 'Apenas formatos selecionados'],
    'control.filterDownload': ['Only selected download status', '只显示指定下载状态', '只顯示指定下載狀態', 'Afficher uniquement l’état de téléchargement choisi', 'Nur gewählten Downloadstatus', 'Только выбранный статус загрузки', '指定したダウンロード状態のみ表示', '선택한 다운로드 상태만 표시', 'Solo estado de descarga seleccionado', 'Apenas status de download selecionado'],
    'control.filterYear': ['Only selected publication years', '只显示指定年份的书籍', '只顯示指定年份的書籍', 'Afficher uniquement les années choisies', 'Nur ausgewählte Erscheinungsjahre', 'Только выбранные годы издания', '指定した出版年のみ表示', '선택한 출판 연도만 표시', 'Solo años de publicación seleccionados', 'Apenas anos de publicação selecionados'],
    'setting.formats': ['File formats (multiple)', '筛选文件格式（可多选）', '篩選檔案格式（可多選）', 'Formats (choix multiples)', 'Dateiformate (Mehrfachauswahl)', 'Форматы (можно несколько)', 'ファイル形式（複数選択可）', '파일 형식(복수 선택)', 'Formatos (selección múltiple)', 'Formatos (seleção múltipla)'],
    'setting.other': ['All others', '其他全部', '其他全部', 'Tous les autres', 'Alle anderen', 'Все остальные', 'その他すべて', '기타 모두', 'Todos los demás', 'Todos os outros'],
    'setting.custom': ['Custom', '自定义', '自訂', 'Personnalisé', 'Benutzerdefiniert', 'Свой вариант', 'カスタム', '사용자 지정', 'Personalizado', 'Personalizado'],
    'setting.customPlaceholder': ['e.g. djvu, txt; fb2', '如 djvu, txt; fb2', '例如 djvu, txt; fb2', 'ex. djvu, txt; fb2', 'z. B. djvu, txt; fb2', 'например djvu, txt; fb2', '例: djvu, txt; fb2', '예: djvu, txt; fb2', 'p. ej. djvu, txt; fb2', 'ex.: djvu, txt; fb2'],
    'setting.customHint': ['Separate formats with commas or semicolons.', '用逗号或分号分隔格式。', '以逗號或分號分隔格式。', 'Séparez les formats par des virgules ou des points-virgules.', 'Formate durch Kommas oder Semikolons trennen.', 'Разделяйте форматы запятыми или точками с запятой.', 'カンマまたはセミコロンで区切ります。', '쉼표나 세미콜론으로 구분하세요.', 'Separe los formatos con comas o punto y coma.', 'Separe os formatos com vírgulas ou ponto e vírgula.'],
    'setting.downloadRule': ['Download status rule', '下载状态规则', '下載狀態規則', 'Règle de téléchargement', 'Downloadstatus-Regel', 'Правило статуса загрузки', 'ダウンロード状態の条件', '다운로드 상태 규칙', 'Regla de descarga', 'Regra de download'],
    'setting.onlyUndownloaded': ['Not downloaded', '仅未下载', '僅未下載', 'Non téléchargés', 'Nicht heruntergeladen', 'Не загруженные', '未ダウンロード', '다운로드하지 않음', 'No descargados', 'Não baixados'],
    'setting.onlyDownloaded': ['Downloaded', '仅已下载', '僅已下載', 'Téléchargés', 'Heruntergeladen', 'Загруженные', 'ダウンロード済み', '다운로드됨', 'Descargados', 'Baixados'],
    'setting.yearRange': ['Publication year range (inclusive)', '出版年份范围（含端点）', '出版年份範圍（含端點）', 'Années de publication (bornes incluses)', 'Erscheinungsjahre (einschließlich Grenzen)', 'Годы издания (границы включены)', '出版年の範囲（両端を含む）', '출판 연도 범위(양끝 포함)', 'Años de publicación (inclusive)', 'Anos de publicação (inclusivo)'],
    'setting.minYear': ['Minimum year', '最小年份', '最小年份', 'Année minimale', 'Frühestes Jahr', 'Минимальный год', '開始年', '최소 연도', 'Año mínimo', 'Ano mínimo'],
    'setting.maxYear': ['Maximum year', '最大年份', '最大年份', 'Année maximale', 'Spätestes Jahr', 'Максимальный год', '終了年', '최대 연도', 'Año máximo', 'Ano máximo'],
    'setting.yearPlaceholder': ['Blank = no limit', '留空不限', '留空不限', 'Vide = sans limite', 'Leer = keine Grenze', 'Пусто = без ограничения', '空欄＝制限なし', '빈칸 = 제한 없음', 'Vacío = sin límite', 'Vazio = sem limite'],
    'setting.yearHint': ['Applies after a pause or Enter; either bound may be blank.', '停顿后或按回车生效；可只填一端。', '停頓後或按 Enter 生效；可只填一端。', 'Appliqué après une pause ou Entrée ; une borne peut rester vide.', 'Nach kurzer Pause oder Eingabe wirksam; eine Grenze kann leer sein.', 'Применяется после паузы или Enter; одну границу можно оставить пустой.', '入力後しばらく待つか Enter で適用。片側は空欄可。', '잠시 후 또는 Enter로 적용; 한쪽은 비워도 됩니다.', 'Se aplica tras una pausa o Intro; puede dejar un límite vacío.', 'Aplica após uma pausa ou Enter; um limite pode ficar vazio.'],
    'setting.missingYear': ['Include books without a year', '显示年份缺失的书籍', '顯示缺少年份的書籍', 'Inclure les livres sans année', 'Bücher ohne Jahr einschließen', 'Включать книги без года', '出版年不明の本も表示', '연도 없는 책 포함', 'Incluir libros sin año', 'Incluir livros sem ano'],
    'setting.resetPosition': ['Reset panel position', '重置浮窗位置', '重設浮窗位置', 'Réinitialiser la position', 'Panelposition zurücksetzen', 'Сбросить положение панели', 'パネル位置をリセット', '패널 위치 초기화', 'Restablecer posición', 'Redefinir posição'],
    'setting.userMatches': ['Other mirrors: add User matches in Tampermonkey.', '其他镜像：请在 Tampermonkey 中添加 User matches。', '其他鏡像：請在 Tampermonkey 中加入 User matches。', 'Autres miroirs : ajoutez des User matches dans Tampermonkey.', 'Weitere Mirrors: User matches in Tampermonkey hinzufügen.', 'Другие зеркала: добавьте User matches в Tampermonkey.', '他のミラーは Tampermonkey の User matches に追加してください。', '다른 미러는 Tampermonkey의 User matches에 추가하세요.', 'Otros espejos: añada User matches en Tampermonkey.', 'Outros espelhos: adicione User matches no Tampermonkey.'],
    'setting.language': ['Interface language', '界面语言', '介面語言', 'Langue de l’interface', 'Oberflächensprache', 'Язык интерфейса', '表示言語', '인터페이스 언어', 'Idioma de la interfaz', 'Idioma da interface'],
    'setting.autoLanguage': ['Follow browser/system', '跟随浏览器/系统', '跟隨瀏覽器／系統', 'Suivre le navigateur/système', 'Browser/System folgen', 'Как в браузере/системе', 'ブラウザー／システムに従う', '브라우저/시스템 따르기', 'Seguir navegador/sistema', 'Seguir navegador/sistema'],
    'setting.showNotice': ['Show welcome notice on this site', '在本站显示启动提示', '在本站顯示啟用提示', 'Afficher l’avis sur ce site', 'Hinweis auf dieser Seite anzeigen', 'Показывать уведомление на этом сайте', 'このサイトで案内を表示', '이 사이트에서 안내 표시', 'Mostrar aviso en este sitio', 'Mostrar aviso neste site'],
    'setting.allowBulk': ['Enable bulk opening on this site', '在本站启用批量打开', '在本站啟用批次開啟', 'Activer l’ouverture groupée sur ce site', 'Massenöffnung auf dieser Seite aktivieren', 'Включить массовое открытие на этом сайте', 'このサイトで一括で開く機能を有効化', '이 사이트에서 일괄 열기 사용', 'Activar apertura masiva en este sitio', 'Ativar abertura em massa neste site'],
    'notice.message': ['Booklist tools are ready. Open any booklist to use them.', '工具已生效，打开任意书单即可使用。', '工具已啟用，開啟任意書單即可使用。', 'Les outils sont prêts. Ouvrez une liste de livres.', 'Die Werkzeuge sind bereit. Öffnen Sie eine Bücherliste.', 'Инструмент готов. Откройте любой список книг.', 'ツールは有効です。書籍リストを開くと使えます。', '도구가 준비되었습니다. 책 목록을 열어 사용하세요.', 'La herramienta está lista. Abra cualquier lista de libros.', 'A ferramenta está pronta. Abra qualquer lista de livros.'],
    'notice.link': ['Try it', '点击试用', '點擊試用', 'Essayer', 'Ausprobieren', 'Попробовать', '試す', '사용해 보기', 'Probar', 'Experimentar'],
    'notice.listPage': ['Open any booklist to use the tools.', '打开任意书单即可启用工具。', '開啟任意書單即可啟用工具。', 'Ouvrez une liste de livres pour utiliser les outils.', 'Öffnen Sie eine Bücherliste, um die Werkzeuge zu nutzen.', 'Откройте любой список книг, чтобы использовать инструмент.', '書籍リストを開くと使えます。', '책 목록을 열면 사용할 수 있습니다.', 'Abra una lista de libros para usar la herramienta.', 'Abra uma lista de livros para usar a ferramenta.'],
    'notice.close': ['Close · {seconds}s', '关闭 · {seconds}秒', '關閉 · {seconds}秒', 'Fermer · {seconds}s', 'Schließen · {seconds}s', 'Закрыть · {seconds}с', '閉じる · {seconds}秒', '닫기 · {seconds}초', 'Cerrar · {seconds}s', 'Fechar · {seconds}s'],
    'notice.optout': ['Do not show this again', '不再显示该提示', '不再顯示此提示', 'Ne plus afficher cet avis', 'Diesen Hinweis nicht mehr anzeigen', 'Больше не показывать', '今後表示しない', '다시 표시하지 않기', 'No volver a mostrar', 'Não mostrar novamente'],
    'summary.loaded': ['Loaded books', '当前已加载', '目前已載入', 'Livres chargés', 'Geladene Bücher', 'Загружено книг', '読み込み済み', '로드된 책', 'Libros cargados', 'Livros carregados'],
    'summary.matched': ['After filtering', '本工具筛选后', '本工具篩選後', 'Après filtrage', 'Nach Filterung', 'После фильтрации', '絞り込み後', '필터링 후', 'Tras filtrar', 'Após filtrar'],
    'summary.total': ['Booklist total', '书单共', '書單共', 'Total de la liste', 'Bücher insgesamt', 'Всего в списке', 'リスト全体', '목록 전체', 'Total de la lista', 'Total da lista'],
    'summary.unknown': ['Unknown', '未知', '未知', 'Inconnu', 'Unbekannt', 'Неизвестно', '不明', '알 수 없음', 'Desconocido', 'Desconhecido'],
    'progress.empty': ['No books loaded yet', '尚无已加载书籍', '尚無已載入書籍', 'Aucun livre chargé', 'Noch keine Bücher geladen', 'Книги ещё не загружены', 'まだ読み込みなし', '아직 로드된 책 없음', 'Aún no hay libros cargados', 'Nenhum livro carregado'],
    'progress.text': ['About {expansions} expansions; around page {current}; about {remaining} pages left; about {pages} pages total', '约展开 {expansions} 次，当前约第 {current} 页，尚未加载约 {remaining} 页，书单总长度约 {pages} 页', '約展開 {expansions} 次，目前約第 {current} 頁，尚未載入約 {remaining} 頁，書單總長約 {pages} 頁', 'Environ {expansions} chargements ; page {current} ; {remaining} pages restantes ; {pages} pages au total', 'Etwa {expansions} Erweiterungen; Seite {current}; noch {remaining} Seiten; insgesamt {pages} Seiten', 'Примерно {expansions} раскрытий; страница {current}; осталось {remaining} стр.; всего {pages} стр.', '約 {expansions} 回展開、現在約 {current} ページ、残り約 {remaining} ページ、全 {pages} ページ', '약 {expansions}회 더 보기, 현재 약 {current}페이지, 남은 약 {remaining}페이지, 총 약 {pages}페이지', 'Unas {expansions} ampliaciones; página {current}; quedan {remaining} páginas; {pages} en total', 'Cerca de {expansions} expansões; página {current}; faltam {remaining} páginas; {pages} no total'],
    'progress.zero': ['No books loaded; about {remaining} pages left; about {pages} pages total', '尚无已加载书籍，尚未加载约 {remaining} 页，书单总长度约 {pages} 页', '尚無已載入書籍，尚未載入約 {remaining} 頁，書單總長約 {pages} 頁', 'Aucun livre chargé ; {remaining} pages restantes ; {pages} pages au total', 'Noch keine Bücher geladen; {remaining} Seiten übrig; insgesamt {pages} Seiten', 'Книги ещё не загружены; осталось {remaining} стр.; всего {pages} стр.', 'まだ本を読み込んでいません。残り約 {remaining} ページ、全 {pages} ページ', '아직 로드된 책 없음; 남은 약 {remaining}페이지, 총 약 {pages}페이지', 'Aún no hay libros; quedan {remaining} páginas; {pages} en total', 'Nenhum livro carregado; faltam {remaining} páginas; {pages} no total'],
    'auto.showMore': ['Click Show more 5 times', '连点 5 次 Show more', '連點 5 次 Show more', 'Cliquer 5 fois sur Show more', 'Show more 5-mal klicken', 'Нажать Show more 5 раз', 'Show more を5回押す', 'Show more 5회 클릭', 'Pulsar Show more 5 veces', 'Clicar Show more 5 vezes'],
    'auto.openAll': ['Open all books in current view', '打开当前视图的所有图书页面', '開啟目前檢視的所有圖書頁面', 'Ouvrir tous les livres affichés', 'Alle Bücher der aktuellen Ansicht öffnen', 'Открыть все книги текущего вида', '現在表示中の本をすべて開く', '현재 화면의 모든 책 열기', 'Abrir todos los libros visibles', 'Abrir todos os livros visíveis'],
    'auto.favorite': ['Add visible books to favorites', '批量加入收藏', '批次加入收藏', 'Ajouter les livres visibles aux favoris', 'Sichtbare Bücher zu Favoriten hinzufügen', 'Добавить видимые книги в избранное', '表示中の本をお気に入りに追加', '보이는 책을 즐겨찾기에 추가', 'Añadir libros visibles a favoritos', 'Adicionar livros visíveis aos favoritos'],
    'auto.dev': ['In development', '开发中', '開發中', 'En développement', 'In Entwicklung', 'В разработке', '開発中', '개발 중', 'En desarrollo', 'Em desenvolvimento'],
    'auto.firstWarning': ['Open {count} pages? This may slow your browser or trigger rate limits.', '将打开 {count} 个页面，可能卡顿或触发站点限流。继续？', '將開啟 {count} 個頁面，可能卡頓或觸發網站限流。繼續？', 'Ouvrir {count} pages ? Le navigateur peut ralentir ou le site limiter l’accès.', '{count} Seiten öffnen? Browser und Website können langsam werden oder Zugriffe begrenzen.', 'Открыть {count} страниц? Возможны замедление и ограничение доступа.', '{count} ページを開きますか？動作低下やアクセス制限の可能性があります。', '{count}개 페이지를 여시겠습니까? 속도 저하나 접근 제한이 발생할 수 있습니다.', '¿Abrir {count} páginas? Puede ralentizar el navegador o activar límites.', 'Abrir {count} páginas? Pode causar lentidão ou limite de acesso.'],
    'auto.repeatWarning': ['Already run on this page; {count} pages may open again.', '本页已执行过，可能重复打开 {count} 个页面。', '本頁已執行過，可能重複開啟 {count} 個頁面。', 'Déjà exécuté ici ; {count} pages pourraient rouvrir.', 'Hier bereits ausgeführt; {count} Seiten könnten erneut öffnen.', 'Уже запускалось здесь; {count} страниц могут открыться снова.', 'このページで実行済みです。{count} ページが再度開く可能性があります。', '이 페이지에서 이미 실행했습니다. {count}개 페이지가 다시 열릴 수 있습니다.', 'Ya se ejecutó aquí; podrían reabrirse {count} páginas.', 'Já foi executado aqui; {count} páginas podem abrir novamente.'],
    'auto.secondWarning': ['Opened pages cannot be closed in bulk. You accept the risks. Continue?', '已打开的页面无法批量撤销。风险由你承担，确认执行？', '已開啟的頁面無法批次撤銷。風險由你承擔，確定執行？', 'Les pages ouvertes ne peuvent pas être fermées en lot. Vous acceptez les risques ?', 'Geöffnete Seiten lassen sich nicht gesammelt schließen. Risiko übernehmen?', 'Открытые страницы нельзя закрыть разом. Вы принимаете риск?', '開いたページは一括で閉じられません。リスクを承知で続行しますか？', '열린 페이지를 일괄로 닫을 수 없습니다. 위험을 감수하고 계속하시겠습니까?', 'Las páginas abiertas no pueden cerrarse en lote. ¿Acepta los riesgos?', 'As páginas abertas não podem ser fechadas em lote. Aceita os riscos?'],
    'auto.cancel': ['Cancel', '取消', '取消', 'Annuler', 'Abbrechen', 'Отмена', 'キャンセル', '취소', 'Cancelar', 'Cancelar'],
    'auto.continue': ['Continue', '继续', '繼續', 'Continuer', 'Weiter', 'Продолжить', '続行', '계속', 'Continuar', 'Continuar'],
    'auto.showMoreStatus': ['Show more: {completed}/5 batches, {added} new books.', 'Show more：已完成 {completed}/5 轮，新增 {added} 本。', 'Show more：完成 {completed}/5 輪，新增 {added} 本。', 'Show more : {completed}/5 lots, {added} livres ajoutés.', 'Show more: {completed}/5 Runden, {added} neue Bücher.', 'Show more: {completed}/5 этапов, добавлено {added} книг.', 'Show more：{completed}/5 回、{added} 冊追加。', 'Show more: {completed}/5회, {added}권 추가.', 'Show more: {completed}/5 tandas, {added} libros nuevos.', 'Show more: {completed}/5 lotes, {added} livros novos.'],
    'auto.showMoreEnd': ['Reached the end of the list.', '已到达书单末尾。', '已到達書單末尾。', 'Fin de la liste atteinte.', 'Listenende erreicht.', 'Достигнут конец списка.', 'リストの末尾に到達しました。', '목록 끝에 도달했습니다.', 'Se llegó al final de la lista.', 'Fim da lista alcançado.'],
    'auto.showMoreTimeout': ['Stopped: this batch did not finish within 20 seconds.', '已停止：本轮 20 秒内未加载完成。', '已停止：本輪 20 秒內未載入完成。', 'Arrêt : ce lot n’a pas fini en 20 secondes.', 'Gestoppt: Runde nicht in 20 Sekunden abgeschlossen.', 'Остановлено: этап не завершился за 20 секунд.', '停止：20 秒以内に読み込みが完了しませんでした。', '중지: 20초 안에 로드되지 않았습니다.', 'Se detuvo: el lote no terminó en 20 segundos.', 'Parou: o lote não terminou em 20 segundos.'],
    'auto.showMoreUnavailable': ['Stopped: Show more is unavailable.', '已停止：Show more 不可用。', '已停止：Show more 無法使用。', 'Arrêt : Show more indisponible.', 'Gestoppt: Show more nicht verfügbar.', 'Остановлено: Show more недоступна.', '停止：Show more が利用できません。', '중지: Show more를 사용할 수 없습니다.', 'Se detuvo: Show more no está disponible.', 'Parou: Show more indisponível.'],
    'auto.showMoreError': ['Stopped after an error.', '发生错误，已停止。', '發生錯誤，已停止。', 'Arrêt après une erreur.', 'Nach Fehler gestoppt.', 'Остановлено из-за ошибки.', 'エラーで停止しました。', '오류로 중지했습니다.', 'Se detuvo por un error.', 'Parou após um erro.'],
    'auto.bulkDisabled': ['Enable bulk opening for this site in Settings.', '请先在设置中启用本站批量打开。', '請先在設定中啟用本站批次開啟。', 'Activez l’ouverture groupée pour ce site dans les paramètres.', 'Massenöffnung für diese Seite in Einstellungen aktivieren.', 'Включите массовое открытие для сайта в настройках.', '設定でこのサイトの一括開きを有効にしてください。', '설정에서 이 사이트의 일괄 열기를 활성화하세요.', 'Active la apertura masiva para este sitio.', 'Ative a abertura em massa neste site.'],
    'auto.bulkApi': ['GM_openInTab is unavailable.', '脚本管理器未提供 GM_openInTab。', '腳本管理器未提供 GM_openInTab。', 'GM_openInTab est indisponible.', 'GM_openInTab ist nicht verfügbar.', 'GM_openInTab недоступен.', 'GM_openInTab が利用できません。', 'GM_openInTab을 사용할 수 없습니다.', 'GM_openInTab no está disponible.', 'GM_openInTab indisponível.'],
    'auto.bulkFilters': ['Wait for valid filter rules and download status.', '请等待筛选规则和下载状态就绪。', '請等待篩選規則與下載狀態就緒。', 'Attendez des filtres valides et l’état des téléchargements.', 'Auf gültige Filter und Downloadstatus warten.', 'Дождитесь корректных фильтров и статуса загрузок.', '有効な条件とダウンロード状態を待ってください。', '유효한 필터와 다운로드 상태를 기다리세요.', 'Espere reglas válidas y el estado de descarga.', 'Aguarde filtros válidos e status de download.'],
    'auto.bulkUnknown': ['Some download statuses are unknown; bulk opening is paused.', '部分下载状态未知，批量打开已暂停。', '部分下載狀態未知，批次開啟暫停。', 'Certains états de téléchargement sont inconnus ; ouverture en pause.', 'Einige Downloadstatus unbekannt; Öffnen pausiert.', 'Часть статусов неизвестна; открытие приостановлено.', '一部のダウンロード状態が不明です。一括開きを停止中。', '일부 다운로드 상태가 불명확하여 일괄 열기를 중지합니다.', 'Algunos estados son desconocidos; apertura en pausa.', 'Alguns status são desconhecidos; abertura pausada.'],
    'auto.bulkEmpty': ['No eligible visible book links.', '当前没有可打开的可见书籍链接。', '目前沒有可開啟的可見書籍連結。', 'Aucun lien de livre visible valide.', 'Keine gültigen sichtbaren Buchlinks.', 'Нет подходящих видимых ссылок на книги.', '開ける表示中の本のリンクがありません。', '열 수 있는 보이는 책 링크가 없습니다.', 'No hay enlaces visibles válidos.', 'Nenhum link de livro visível elegível.'],
    'auto.bulkChanged': ['List or permission changed; nothing was opened.', '书单或权限已变化，本次没有打开页面。', '書單或權限已變更，本次未開啟頁面。', 'Liste ou autorisation modifiée ; aucune page ouverte.', 'Liste oder Berechtigung geändert; keine Seite geöffnet.', 'Список или разрешение изменились; страницы не открыты.', 'リストまたは権限が変わりました。開いていません。', '목록 또는 권한이 변경되어 페이지를 열지 않았습니다.', 'La lista o el permiso cambió; no se abrió nada.', 'Lista ou permissão mudou; nada foi aberto.'],
    'auto.bulkProgress': ['Attempted {attempted}; submitted {submitted}; failed {failed}. Submission does not mean loaded.', '已尝试 {attempted}；已提交打开 {submitted}；失败 {failed}。提交不等于加载成功。', '已嘗試 {attempted}；已提交開啟 {submitted}；失敗 {failed}。提交不等於載入成功。', 'Tentés {attempted} ; soumis {submitted} ; échecs {failed}. Soumis ne veut pas dire chargés.', 'Versucht {attempted}; gesendet {submitted}; fehlgeschlagen {failed}. Gesendet heißt nicht geladen.', 'Попыток {attempted}; отправлено {submitted}; ошибок {failed}. Отправка не означает загрузку.', '試行 {attempted}、送信 {submitted}、失敗 {failed}。送信は読み込み成功ではありません。', '시도 {attempted}, 요청 {submitted}, 실패 {failed}. 요청은 로드 성공이 아닙니다.', 'Intentos {attempted}; enviados {submitted}; fallos {failed}. Enviado no significa cargado.', 'Tentativas {attempted}; enviados {submitted}; falhas {failed}. Enviado não significa carregado.'],
    'rule.manual': ['Set a rule', '请手动设置', '請手動設定', 'Définir une règle', 'Regel festlegen', 'Задайте правило', '条件を設定', '규칙 설정', 'Configure una regla', 'Defina uma regra'],
    'rule.conflict': ['Conflicting settings', '设置冲突', '設定衝突', 'Paramètres contradictoires', 'Widersprüchliche Einstellungen', 'Конфликт настроек', '設定が競合', '설정 충돌', 'Configuración contradictoria', 'Configurações conflitantes'],
    'rule.waiting': ['Waiting for download status', '等待下载状态', '等待下載狀態', 'Attente des téléchargements', 'Warte auf Downloadstatus', 'Ожидание статуса загрузки', 'ダウンロード状態を待機中', '다운로드 상태 대기 중', 'Esperando estado de descarga', 'Aguardando status de download'],
    'rule.unconfirmed': ['Download status unconfirmed', '下载状态未确认', '下載狀態未確認', 'État des téléchargements non confirmé', 'Downloadstatus unbestätigt', 'Статус загрузки не подтверждён', 'ダウンロード状態を確認できません', '다운로드 상태 미확인', 'Estado de descarga no confirmado', 'Status de download não confirmado'],
    'rule.missingYear': ['include missing year', '含年份缺失', '含缺少年份', 'inclure les années manquantes', 'fehlendes Jahr einschließen', 'включая без года', '年不明を含む', '연도 없음 포함', 'incluir sin año', 'incluir ano ausente'],
    'hint.formatEmpty': ['Select formats; no books are hidden yet.', '请选择筛选格式；当前不隐藏条目', '請選擇格式；目前不隱藏條目', 'Choisissez des formats ; aucun livre n’est masqué.', 'Formate wählen; noch keine Bücher ausgeblendet.', 'Выберите форматы; книги пока не скрыты.', '形式を選択してください。まだ非表示にはしません。', '형식을 선택하세요. 아직 책을 숨기지 않습니다.', 'Elija formatos; aún no se ocultan libros.', 'Selecione formatos; nenhum livro está oculto.'],
    'hint.invalidCustom': ['Invalid custom formats were ignored.', '部分自定义格式无效，已忽略', '部分自訂格式無效，已忽略', 'Formats personnalisés invalides ignorés.', 'Ungültige eigene Formate ignoriert.', 'Неверные форматы пропущены.', '無効なカスタム形式を無視しました。', '잘못된 사용자 형식을 무시했습니다.', 'Se ignoraron formatos personalizados no válidos.', 'Formatos personalizados inválidos ignorados.'],
    'hint.yearEmpty': ['Set a year bound; no year filtering yet.', '请设置最小或最大年份；当前不按年份隐藏条目', '請設定最小或最大年份；目前不依年份隱藏', 'Indiquez une borne ; aucun filtrage par année.', 'Jahresgrenze festlegen; noch kein Jahresfilter.', 'Задайте границу года; фильтр пока не действует.', '年の範囲を指定してください。まだ絞り込みません。', '연도 경계를 설정하세요. 아직 필터링하지 않습니다.', 'Defina un límite; aún no se filtra por año.', 'Defina um limite; ainda sem filtro por ano.'],
    'hint.downloadWaiting': ['Waiting for download status; filter paused.', '等待下载状态加载中；下载筛选暂停', '等待下載狀態載入；篩選暫停', 'Attente des téléchargements ; filtre en pause.', 'Warte auf Downloadstatus; Filter pausiert.', 'Ожидание статуса; фильтр приостановлен.', 'ダウンロード状態を待機中。フィルター停止中。', '다운로드 상태 대기 중; 필터 일시 중지.', 'Esperando descargas; filtro en pausa.', 'Aguardando downloads; filtro pausado.'],
    'hint.downloadAmbiguous': ['Empty site records and request failure cannot be distinguished; filter paused.', '站点空记录与请求失败无法区分；下载筛选暂停', '無法區分空紀錄與請求失敗；篩選暫停', 'Impossible de distinguer une liste vide d’un échec ; filtre en pause.', 'Leere Daten und Anfragefehler nicht unterscheidbar; Filter pausiert.', 'Пустые данные и сбой запроса неразличимы; фильтр остановлен.', '空の記録か通信失敗か不明です。フィルター停止中。', '빈 기록과 요청 실패를 구분할 수 없어 필터를 중지합니다.', 'No se distingue lista vacía de error; filtro en pausa.', 'Não é possível distinguir lista vazia de falha; filtro pausado.'],
    'hint.downloadTimeout': ['Status unconfirmed after 30 seconds; refresh or check login.', '下载状态 30 秒内未确认；请刷新页面或检查是否已登录', '30 秒內未確認下載狀態；請重新整理或檢查登入', 'État non confirmé après 30 s ; actualisez ou vérifiez la connexion.', 'Status nach 30 s unbestätigt; neu laden oder Anmeldung prüfen.', 'Статус не подтверждён за 30 с; обновите страницу или проверьте вход.', '30 秒後も未確認です。再読み込みかログイン確認を。', '30초 동안 확인되지 않았습니다. 새로고침하거나 로그인 상태를 확인하세요.', 'Estado sin confirmar tras 30 s; actualice o compruebe sesión.', 'Status não confirmado após 30 s; atualize ou confira o login.'],
    'hint.downloadFailed': ['Status unavailable; refresh or check login.', '下载状态不可判定；请刷新页面或检查是否已登录', '無法判定下載狀態；請重新整理或檢查登入', 'État indisponible ; actualisez ou vérifiez la connexion.', 'Status nicht verfügbar; neu laden oder Anmeldung prüfen.', 'Статус недоступен; обновите страницу или проверьте вход.', '状態を確認できません。再読み込みかログイン確認を。', '상태를 확인할 수 없습니다. 새로고침하거나 로그인 상태를 확인하세요.', 'Estado no disponible; actualice o compruebe sesión.', 'Status indisponível; atualize ou confira o login.'],
    'hint.downloadUnknown': ['Some statuses are unknown; those books remain visible.', '部分条目的下载状态未知，已保留显示', '部分書籍下載狀態未知，仍會顯示', 'Certains états sont inconnus ; livres conservés.', 'Einige Status unbekannt; Bücher bleiben sichtbar.', 'Часть статусов неизвестна; книги остаются видимыми.', '一部の状態は不明のため、表示を維持します。', '일부 상태를 알 수 없어 계속 표시합니다.', 'Algunos estados son desconocidos; se mantienen visibles.', 'Alguns status são desconhecidos; livros permanecem visíveis.'],
    'hint.structure': ['Some card details were not found; the site layout may have changed.', '部分卡片信息位置未找到；页面结构可能已变', '部分卡片資訊找不到；頁面結構可能已變', 'Détails introuvables ; la page a peut-être changé.', 'Kartendetails fehlen; Seitenlayout könnte geändert sein.', 'Данные карточек не найдены; вёрстка могла измениться.', 'カード情報が見つかりません。ページ構造が変わった可能性があります。', '일부 카드 정보를 찾지 못했습니다. 페이지 구조가 바뀌었을 수 있습니다.', 'Faltan detalles; quizá cambió el diseño.', 'Detalhes não encontrados; o layout pode ter mudado.'],
    'hint.unknownFormat': ['Unknown format', '未知格式', '未知格式', 'Format inconnu', 'Unbekanntes Format', 'Неизвестный формат', '形式不明', '알 수 없는 형식', 'Formato desconocido', 'Formato desconhecido'],
    'hint.yearPending': ['Year rule pending', '年份规则待设置', '年份規則待設定', 'Règle d’année en attente', 'Jahresregel fehlt', 'Правило года не задано', '年の条件が未設定', '연도 규칙 미설정', 'Regla de año pendiente', 'Regra de ano pendente'],
    'hint.formatPending': ['Format rule pending', '文件格式规则待设置', '格式規則待設定', 'Règle de format en attente', 'Formatregel fehlt', 'Правило формата не задано', '形式条件が未設定', '형식 규칙 미설정', 'Regla de formato pendiente', 'Regra de formato pendente'],
    'hint.downloadPaused': ['Download filter paused', '下载状态筛选暂停', '下載狀態篩選暫停', 'Filtre de téléchargement en pause', 'Downloadfilter pausiert', 'Фильтр загрузки остановлен', 'ダウンロード絞り込み停止中', '다운로드 필터 일시 중지', 'Filtro de descarga en pausa', 'Filtro de download pausado'],
    'action.settings': ['Settings', '设置', '設定', 'Paramètres', 'Einstellungen', 'Настройки', '設定', '설정', 'Configuración', 'Configurações'],
    'action.globalSettings': ['Global settings', '全局设置', '全域設定', 'Paramètres généraux', 'Globale Einstellungen', 'Общие настройки', '全体設定', '전역 설정', 'Ajustes generales', 'Configurações globais'],
    'action.configureFormat': ['Configure file format filter', '配置文件格式筛选', '設定檔案格式篩選', 'Configurer le filtre des formats', 'Formatfilter konfigurieren', 'Настроить фильтр форматов', '形式フィルターを設定', '파일 형식 필터 설정', 'Configurar filtro de formato', 'Configurar filtro de formato'],
    'action.configureDownload': ['Configure download status filter', '配置下载状态筛选', '設定下載狀態篩選', 'Configurer le filtre des téléchargements', 'Downloadfilter konfigurieren', 'Настроить фильтр загрузок', 'ダウンロード状態フィルターを設定', '다운로드 상태 필터 설정', 'Configurar filtro de descarga', 'Configurar filtro de download'],
    'action.configureYear': ['Configure year filter', '配置年份筛选', '設定年份篩選', 'Configurer le filtre des années', 'Jahresfilter konfigurieren', 'Настроить фильтр года', '年フィルターを設定', '연도 필터 설정', 'Configurar filtro de año', 'Configurar filtro de ano'],
    'action.collapse': ['Collapse panel', '折叠面板', '收合面板', 'Réduire le panneau', 'Panel einklappen', 'Свернуть панель', 'パネルを閉じる', '패널 접기', 'Contraer panel', 'Recolher painel'],
    'action.expand': ['Expand panel', '展开面板', '展開面板', 'Développer le panneau', 'Panel ausklappen', 'Развернуть панель', 'パネルを開く', '패널 펼치기', 'Expandir panel', 'Expandir painel'],
    'action.waitDownload': ['Waiting for download status', '等待下载状态', '等待下載狀態', 'Attente des téléchargements', 'Warte auf Downloadstatus', 'Ожидание статуса загрузки', 'ダウンロード状態を待機中', '다운로드 상태 대기 중', 'Esperando estado de descarga', 'Aguardando status de download'],
    'action.downloadUnconfirmed': ['Download status unconfirmed', '下载状态未确认', '下載狀態未確認', 'État non confirmé', 'Status unbestätigt', 'Статус не подтверждён', '状態未確認', '상태 미확인', 'Estado no confirmado', 'Status não confirmado'],
  };
  const TRANSLATION_KEYS = Object.keys(MESSAGES);
  const TRANSLATIONS = Object.fromEntries(LOCALES.map((locale, index) => [locale,
    Object.fromEntries(TRANSLATION_KEYS.map(key => [key, MESSAGES[key][index]]))]));

  function resolveLocale(preference, languages) {
    if (LOCALES.includes(preference)) return preference;
    for (const raw of Array.isArray(languages) ? languages : []) {
      const tag = String(raw ?? '').toLowerCase();
      if (tag === 'zh-tw' || tag === 'zh-hk' || tag === 'zh-mo' || tag.startsWith('zh-hant')) return 'zh-TW';
      if (tag.startsWith('zh')) return 'zh-CN';
      if (tag.startsWith('pt')) return 'pt-BR';
      const exact = LOCALES.find(locale => locale.toLowerCase() === tag);
      if (exact) return exact;
      const base = tag.split('-')[0];
      const partial = LOCALES.find(locale => locale.toLowerCase() === base);
      if (partial) return partial;
    }
    return 'en';
  }

  function translate(locale, key, params = {}) {
    const template = TRANSLATIONS[locale]?.[key] || TRANSLATIONS.en[key] || '';
    return template.replace(/\{([a-zA-Z][a-zA-Z0-9]*)\}/g, (match, name) => {
      if (!Object.hasOwn(params, name)) return match;
      const value = params[name];
      return typeof value === 'number' ? new Intl.NumberFormat(locale).format(value) : String(value);
    });
  }

  function sanitizeSitePrefs(saved) {
    const result = Object.create(null);
    if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return result;
    for (const [rawHost, rawPrefs] of Object.entries(saved)) {
      const host = rawHost.toLowerCase();
      if (host === '__proto__' || !/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/.test(host)) continue;
      const prefs = rawPrefs && typeof rawPrefs === 'object' && !Array.isArray(rawPrefs) ? rawPrefs : {};
      result[host] = {
        welcomeEnabled: typeof prefs.welcomeEnabled === 'boolean' ? prefs.welcomeEnabled : true,
        bulkOpenEnabled: typeof prefs.bulkOpenEnabled === 'boolean' ? prefs.bulkOpenEnabled : false,
      };
    }
    return result;
  }

  function normalizeExtension(raw) {
    const value = String(raw ?? '').trim().replace(/^\.+/, '').toLowerCase();
    return /^[a-z0-9]+$/.test(value) ? value : '';
  }

  function parseCustomFormats(raw) {
    return new Set(String(raw ?? '').split(/[,;，；]/)
      .map(normalizeExtension)
      .filter(Boolean));
  }

  function invalidCustomFormats(raw) {
    return String(raw ?? '').split(/[,;，；]/).map(value => value.trim())
      .filter(value => value && !normalizeExtension(value));
  }

  function matchesFormat(extension, selected, custom) {
    if (!selected || selected.size === 0) return true;
    const value = normalizeExtension(extension);
    if (selected.has(value)) return true;
    if (selected.has('other') && !KNOWN_FORMATS.has(value)) return true;
    return selected.has('custom') && custom.has(value);
  }

  function hasEffectiveFormatRule(selected, custom) {
    return [...selected].some(value => value !== 'custom') ||
      (selected.has('custom') && custom.size > 0);
  }

  function sanitizeSettings(saved) {
    const input = saved && typeof saved === 'object' ? saved : {};
    return {
      showFormat: typeof input.showFormat === 'boolean' ? input.showFormat : DEFAULT_SETTINGS.showFormat,
      filterFormat: typeof input.filterFormat === 'boolean' ? input.filterFormat : DEFAULT_SETTINGS.filterFormat,
      filterDownload: typeof input.filterDownload === 'boolean' ? input.filterDownload : DEFAULT_SETTINGS.filterDownload,
      formats: Array.isArray(input.formats)
        ? [...new Set(input.formats.filter(value => SETTING_FORMATS.has(value)))] : [],
      custom: typeof input.custom === 'string' ? input.custom.slice(0, 1000) : '',
      downloadRule: ['downloaded', 'not-downloaded'].includes(input.downloadRule)
        ? input.downloadRule : DEFAULT_SETTINGS.downloadRule,
      showLanguage: typeof input.showLanguage === 'boolean' ? input.showLanguage : DEFAULT_SETTINGS.showLanguage,
      showYear: typeof input.showYear === 'boolean' ? input.showYear : DEFAULT_SETTINGS.showYear,
      showFullTitle: typeof input.showFullTitle === 'boolean' ? input.showFullTitle : DEFAULT_SETTINGS.showFullTitle,
      showFullAuthor: typeof input.showFullAuthor === 'boolean' ? input.showFullAuthor : DEFAULT_SETTINGS.showFullAuthor,
      filterYear: typeof input.filterYear === 'boolean' ? input.filterYear : DEFAULT_SETTINGS.filterYear,
      yearMin: typeof input.yearMin === 'string' ? input.yearMin.slice(0, 20) : '',
      yearMax: typeof input.yearMax === 'string' ? input.yearMax.slice(0, 20) : '',
      includeMissingYear: typeof input.includeMissingYear === 'boolean'
        ? input.includeMissingYear : DEFAULT_SETTINGS.includeMissingYear,
      panelDock: input.panelDock && ['top', 'right', 'bottom', 'left'].includes(input.panelDock.edge) &&
        Number.isFinite(input.panelDock.offset) && input.panelDock.offset >= 0
        ? { edge: input.panelDock.edge, offset: input.panelDock.offset } : null,
      uiLanguage: LOCALES.includes(input.uiLanguage) ? input.uiLanguage : DEFAULT_SETTINGS.uiLanguage,
    };
  }

  function parseYearValue(raw) {
    const text = String(raw ?? '').trim();
    if (!/^\d+$/.test(text)) return null;
    const value = Number(text);
    return Number.isInteger(value) && value >= 1 && value <= 9999 ? value : null;
  }

  function parseYearRule(settings) {
    const minText = String(settings.yearMin ?? '').trim();
    const maxText = String(settings.yearMax ?? '').trim();
    if (!minText && !maxText) return { active: false, min: null, max: null, error: '' };
    const min = minText ? parseYearValue(minText) : null;
    const max = maxText ? parseYearValue(maxText) : null;
    if ((minText && min === null) || (maxText && max === null)) {
      return { active: false, min, max, error: '年份须为 1–9999 的整数' };
    }
    if (min !== null && max !== null && min > max) {
      return { active: false, min, max, error: '最小年份不能大于最大年份' };
    }
    return { active: true, min, max, error: '' };
  }

  function matchesYear(rawYear, rule, includeMissingYear) {
    if (!rule.active) return true;
    const year = parseYearValue(rawYear);
    if (year === null) return !!includeMissingYear;
    return (rule.min === null || year >= rule.min) && (rule.max === null || year <= rule.max);
  }

  function parseBookTotal(text) {
    const match = String(text ?? '').match(/\bbooks\s*\(\s*([\d,]+)\s*\)/i);
    if (!match) return null;
    const value = Number(match[1].replaceAll(',', ''));
    return Number.isSafeInteger(value) && value >= 0 ? value : null;
  }

  function computeStats({ loaded, matched, total }) {
    const count = Number.isSafeInteger(loaded) && loaded >= 0 ? loaded : 0;
    const visible = Number.isSafeInteger(matched) ? Math.min(count, Math.max(0, matched)) : 0;
    const validTotal = Number.isSafeInteger(total) && total >= count ? total : null;
    const current = Math.ceil(count / PAGE_SIZE);
    return {
      loaded: count,
      matched: visible,
      total: validTotal,
      pages: validTotal === null ? null : Math.ceil(validTotal / PAGE_SIZE),
      remaining: validTotal === null ? null : Math.ceil((validTotal - count) / PAGE_SIZE),
      current,
      approxExpansions: Math.max(0, current - 1),
    };
  }

  function classifyDownload({ ready, coverId, isbns, lookup }) {
    if (!ready || (!coverId && (!isbns || isbns.length === 0)) || typeof lookup !== 'function') {
      return 'unknown';
    }
    try {
      return lookup(coverId, ...(isbns || [])) ? 'downloaded' : 'not-downloaded';
    } catch {
      return 'unknown';
    }
  }

  function createDownloadGate() {
    let state = 'waiting';
    let ambiguous = false;
    return {
      get state() { return state; },
      get ambiguous() { return ambiguous; },
      onMarksLoaded(map) {
        const valid = map && typeof map === 'object' &&
          map.byId && typeof map.byId === 'object' && !Array.isArray(map.byId) &&
          map.byIsbn && typeof map.byIsbn === 'object' && !Array.isArray(map.byIsbn);
        const hasPositiveEvidence = valid &&
          (Object.keys(map.byId).length > 0 || Object.keys(map.byIsbn).length > 0);
        ambiguous = !hasPositiveEvidence;
        state = hasPositiveEvidence ? 'ready' : 'waiting';
      },
      onTimeout() { if (state === 'waiting') state = 'timed-out'; },
      onFailure() { state = 'failed'; ambiguous = false; },
    };
  }

  function getActiveCards(root) {
    return [...root.querySelectorAll('.booklist-main.active .readlist-view > z-bookcard')];
  }

  function hasBooklistFingerprint(root) {
    const main = root.querySelector('.booklist-main.active');
    if (!main?.querySelector('.readlist-view')) return false;
    if (getActiveCards(root).length > 0) return true;
    return parseBookTotal(root.querySelector('.booklist-header__tabs tab')?.textContent) === 0;
  }

  function classifyPage(hostname, pathname, fingerprint) {
    if (String(pathname || '').startsWith('/booklist/')) return fingerprint ? 'booklist' : 'pending';
    return KNOWN_HOSTS.has(String(hostname || '').toLowerCase()) ? 'notice' : 'silent';
  }

  function noticeRemainingSeconds(startedAt, now) {
    return Math.max(0, Math.ceil((startedAt + 10000 - now) / 1000));
  }

  function shouldShowNotice(host, enabled, sessionStore, documentSeen) {
    if (!enabled || documentSeen.has(host)) return false;
    const key = `zble-intro-seen-v3:${host}`;
    try {
      if (sessionStore?.getItem(key) === '1') return false;
      sessionStore?.setItem(key, '1');
    } catch { /* Storage blocked: dedupe within this document only. */ }
    documentSeen.add(host);
    return true;
  }

  function classifyBatchProgress({ before, now, buttonExists, quietMs, elapsedMs }) {
    if (elapsedMs >= 20000) return 'timeout';
    if (quietMs < 750) return 'wait';
    if (!buttonExists) return 'end';
    return now - before >= PAGE_SIZE ? 'next' : 'wait';
  }

  async function runShowMoreFive({ getCards, findButton, observe, clock = {
    now: () => Date.now(), setTimeout: (callback, delay) => setTimeout(callback, delay),
    clearTimeout: id => clearTimeout(id),
  }, onProgress = () => {}, isSourceAlive = () => true, signal = null }) {
    let completed = 0;
    let added = 0;
    const result = reason => ({ completed, added, reason });
    for (let round = 0; round < 5; round++) {
      if (signal?.aborted || !isSourceAlive()) return result('source-gone');
      const button = findButton();
      if (!button || button.disabled || button.hidden || button.getAttribute?.('aria-disabled') === 'true' ||
          ('isConnected' in button && !button.isConnected) ||
          (button.getClientRects && button.getClientRects().length === 0)) return result('button-unavailable');
      const beforeCards = new Set(getCards());
      const startedAt = clock.now();
      const outcome = await new Promise(resolve => {
        let timer = null;
        let unsubscribe = null;
        let finished = false;
        let seenNew = 0;
        let changedAt = startedAt;
        function finish(reason) {
          if (finished) return;
          finished = true;
          if (timer !== null) clock.clearTimeout(timer);
          if (typeof unsubscribe === 'function') unsubscribe();
          else unsubscribe?.disconnect?.();
          signal?.removeEventListener?.('abort', aborted);
          resolve({ reason, seenNew });
        }
        function aborted() { finish('source-gone'); }
        function check() {
          if (finished) return;
          if (signal?.aborted || !isSourceAlive()) { finish('source-gone'); return; }
          const now = clock.now();
          const newCount = getCards().filter(card => !beforeCards.has(card)).length;
          if (newCount !== seenNew) { seenNew = newCount; changedAt = now; }
          const buttonExists = !!findButton();
          const quietMs = now - changedAt;
          const elapsedMs = now - startedAt;
          const state = classifyBatchProgress({ before: 0, now: newCount, buttonExists, quietMs, elapsedMs });
          if (state !== 'wait') { finish(state); return; }
          if (timer !== null) clock.clearTimeout(timer);
          const untilDeadline = Math.max(1, 20000 - elapsedMs);
          const untilQuiet = Math.max(1, 750 - quietMs);
          timer = clock.setTimeout(check, newCount >= PAGE_SIZE || !buttonExists
            ? Math.min(untilQuiet, untilDeadline) : untilDeadline);
        }
        try {
          unsubscribe = observe(check);
          signal?.addEventListener?.('abort', aborted, { once: true });
          button.click();
          check();
        } catch (error) {
          console.error('Z-lib Booklist Enhancer: Show more task failed', error);
          finish('error');
        }
      });
      added += outcome.seenNew;
      if (outcome.reason === 'next' || outcome.reason === 'end') completed++;
      onProgress(result(outcome.reason));
      if (outcome.reason !== 'next') return result(outcome.reason);
    }
    return result('complete');
  }

  function collectOpenTargets(cards, origin, isSiteVisible) {
    const targets = [];
    const seen = new Set();
    let source;
    try { source = new URL(origin); } catch { return targets; }
    for (const card of cards) {
      if (card.hidden || card.classList?.contains('zble-hidden')) continue;
      try { if (!isSiteVisible(card)) continue; } catch { continue; }
      let url;
      try { url = new URL(card.getAttribute?.('href') || '', source); } catch { continue; }
      if (!['http:', 'https:'].includes(url.protocol) || url.origin !== source.origin ||
          url.username || url.password ||
          !/^\/book\/[^/]+/.test(url.pathname)) continue;
      url.hash = '';
      const value = url.href;
      if (seen.has(value)) continue;
      seen.add(value);
      targets.push(value);
    }
    return targets;
  }

  function canOpenAll({ enabled, filtersReady, unknownDownloads, openTabAvailable }) {
    if (!enabled) return { allowed: false, reason: 'disabled' };
    if (!openTabAvailable) return { allowed: false, reason: 'api-unavailable' };
    if (!filtersReady) return { allowed: false, reason: 'filters-pending' };
    if (unknownDownloads > 0) return { allowed: false, reason: 'unknown-downloads' };
    return { allowed: true, reason: 'ready' };
  }

  async function confirmBulkOpen({ urls, getCurrentTargets, getDomainEnabled, showDialog,
    isSourceAlive = () => true, repeat = false, getFilterSignature = null,
    getCardSnapshot = null, onInvalid = () => {} }) {
    if (!urls.length || !isSourceAlive()) return false;
    try {
      const filterSignature = getFilterSignature?.();
      const cards = getCardSnapshot?.();
      if (!await showDialog(1, { count: urls.length, repeat })) return false;
      if (!await showDialog(2, { count: urls.length, repeat })) return false;
      if (!isSourceAlive() || !getDomainEnabled() ||
          (getFilterSignature && getFilterSignature() !== filterSignature)) { onInvalid(); return false; }
      if (cards) {
        const currentCards = getCardSnapshot();
        if (cards.length !== currentCards.length || cards.some((card, index) => card !== currentCards[index])) {
          onInvalid(); return false;
        }
      }
      const current = getCurrentTargets();
      const valid = current.length === urls.length && current.every((value, index) => value === urls[index]);
      if (!valid) onInvalid();
      return valid;
    } catch { return false; }
  }

  async function runOpenAll({ urls, openTab, delay = ms => new Promise(resolve => setTimeout(resolve, ms)),
    isSourceAlive = () => true, onProgress = () => {} }) {
    const result = { attempted: 0, submitted: 0, failed: 0 };
    for (let index = 0; index < urls.length; index++) {
      if (!isSourceAlive()) break;
      if (index > 0) await delay(350);
      if (!isSourceAlive()) break;
      result.attempted++;
      try {
        await openTab(urls[index], { active: false });
        result.submitted++;
      } catch { result.failed++; }
      onProgress({ ...result });
    }
    return result;
  }

  function createNotice({ locale, host, now, sessionStore, sitePrefs, onDisable }) {
    void host; void sessionStore; void sitePrefs;
    const wrapper = document.createElement('div');
    wrapper.id = 'zble-notice-host';
    const root = wrapper.attachShadow({ mode: 'open' });
    root.innerHTML = `<style>
      :host{all:initial;position:fixed;right:14px;top:14px;z-index:2147483001;display:block;width:min(330px,calc(100vw - 28px));box-sizing:border-box;color-scheme:light;font:14px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif}
      *{box-sizing:border-box}.notice{padding:14px 16px;border:2px solid #247bc7;border-radius:10px;background:#fff;color:#172534;box-shadow:0 6px 22px #0004;animation:zble-flash 1.4s ease-in-out 2}
      @keyframes zble-flash{0%,100%{border-color:#247bc7;box-shadow:0 6px 22px #0004}50%{border-color:#67b7ff;box-shadow:0 0 0 4px #4aa3ff77,0 6px 22px #0004}}
      .head{display:flex;justify-content:space-between;gap:10px;align-items:start}.title{font-weight:700;font-size:15px}button{border:1px solid #83a6c3;background:#eef5fb;color:#133e62;border-radius:6px;padding:4px 7px;cursor:pointer;font:inherit;white-space:nowrap}p{margin:8px 0}a{color:#075da5;text-decoration:underline}.optout{display:flex;gap:6px;align-items:center;font-size:12px}.optout input{accent-color:#075da5}button:focus-visible,a:focus-visible,input:focus-visible{outline:2px solid #0872c5;outline-offset:2px}
      @media(prefers-color-scheme:dark){:host{color-scheme:dark}.notice{background:#1b2430;color:#eef3f8;border-color:#62aef1;box-shadow:0 6px 22px #0009}button{background:#253f54;color:#e9f4ff;border-color:#6d9bbd}a{color:#9bd3ff}}
      @media(prefers-reduced-motion:reduce){.notice{animation:none}}
      @media(forced-colors:active){.notice{border-color:Highlight;box-shadow:none;animation:none}button{forced-color-adjust:auto}}
    </style><div class="notice" role="status"><div class="head"><span class="title"></span><button id="zble-notice-close" type="button"></button></div><p class="message"></p><a class="try" href="/booklists"></a><label class="optout"><input id="zble-notice-optout" type="checkbox"><span></span></label></div>`;
    document.body.append(wrapper);
    const close = root.querySelector('#zble-notice-close');
    const optout = root.querySelector('#zble-notice-optout');
    const link = root.querySelector('.try');
    const startedAt = now();
    let timer = null;
    let disposed = false;
    let currentLocale = locale;
    function refreshLocale(nextLocale = currentLocale) {
      currentLocale = nextLocale;
      root.querySelector('.title').textContent = 'Z-lib Booklist Enhancer';
      root.querySelector('.message').textContent = window.location.pathname === '/booklists'
        ? translate(currentLocale, 'notice.listPage') : translate(currentLocale, 'notice.message');
      link.textContent = translate(currentLocale, 'notice.link');
      link.hidden = window.location.pathname === '/booklists';
      root.querySelector('.optout span').textContent = translate(currentLocale, 'notice.optout');
      tick();
    }
    function tick() {
      if (disposed) return;
      const seconds = noticeRemainingSeconds(startedAt, now());
      close.textContent = translate(currentLocale, 'notice.close', { seconds });
      close.setAttribute('aria-label', close.textContent);
      if (seconds === 0) dispose();
    }
    function dispose() {
      if (disposed) return;
      disposed = true;
      if (timer !== null) clearInterval(timer);
      document.removeEventListener('visibilitychange', tick);
      window.removeEventListener('pageshow', tick);
      wrapper.remove();
    }
    close.addEventListener('click', dispose);
    optout.addEventListener('change', () => { if (optout.checked) { onDisable(); dispose(); } });
    document.addEventListener('visibilitychange', tick);
    window.addEventListener('pageshow', tick);
    refreshLocale();
    timer = setInterval(tick, 250);
    return { refreshLocale, dispose };
  }

  function readCardData(card) {
    const cover = card.shadowRoot?.querySelector('z-cover');
    return {
      extension: normalizeExtension(card.getAttribute('extension')),
      coverId: cover?.getAttribute('id') || '',
      isbns: (cover?.getAttribute('isbn') || '').split(',').map(value => value.trim()).filter(Boolean),
      year: card.getAttribute('year'),
      language: card.getAttribute('language'),
    };
  }

  function compileFilters(settings, downloadReady, lookup) {
    const selected = new Set(settings.formats);
    const custom = parseCustomFormats(settings.custom);
    const yearRule = parseYearRule(settings);
    return {
      selected,
      custom,
      formatActive: settings.filterFormat && hasEffectiveFormatRule(selected, custom),
      downloadActive: settings.filterDownload,
      downloadReady,
      downloadRule: settings.downloadRule,
      lookup,
      yearActive: settings.filterYear && yearRule.active,
      yearRule,
      includeMissingYear: settings.includeMissingYear,
    };
  }

  function evaluateCard(info, context) {
    const formatOk = !context.formatActive || matchesFormat(info.extension, context.selected, context.custom);
    const download = context.downloadActive ? classifyDownload({
      ready: context.downloadReady,
      coverId: info.coverId,
      isbns: info.isbns,
      lookup: context.lookup,
    }) : 'unknown';
    const downloadOk = !context.downloadActive || download === 'unknown' ||
      (context.downloadRule === 'downloaded' ? download === 'downloaded' : download === 'not-downloaded');
    const yearOk = !context.yearActive || matchesYear(info.year, context.yearRule, context.includeMissingYear);
    return { visible: formatOk && downloadOk && yearOk, download };
  }

  function filterActiveCards(root, context) {
    const cards = getActiveCards(root);
    const infos = [];
    const results = [];
    let matched = 0;
    for (const card of cards) {
      const info = readCardData(card);
      const result = evaluateCard(info, context);
      infos.push(info);
      results.push(result);
      if (result.visible) matched++;
    }
    return { cards, infos, results, matched };
  }

  function mutationNeedsRefresh(records) {
    const toolNode = node => node?.classList?.contains('zble-summary-card') ||
      node?.classList?.contains('zble-progress');
    return records.some(record => {
      if (record.type !== 'childList') return true;
      if (record.target.closest?.('.zble-summary-card, .zble-progress')) return false;
      return [...record.addedNodes, ...record.removedNodes].some(node => !toolNode(node));
    });
  }

  function createRefreshScheduler(refresh, enqueue) {
    let queued = false;
    return () => {
      if (queued) return;
      queued = true;
      enqueue(() => {
        queued = false;
        refresh();
      });
    };
  }

  function createPanelResizeHandler(applyDock, schedule) {
    return () => { applyDock(); schedule(); };
  }

  function formatRuleSummary(settings, gateState, yearRule, locale = 'zh-CN') {
    const zh = locale.startsWith('zh');
    const wrap = value => zh ? `（${value}）` : `(${value})`;
    const separator = zh ? '；' : '; ';
    const custom = parseCustomFormats(settings.custom);
    const selected = settings.formats.filter(value => value !== 'custom');
    const formatValues = [...selected, ...(settings.formats.includes('custom') ? [...custom] : [])];
    const format = wrap(formatValues.length ? formatValues.join(zh ? '、' : ', ') : translate(locale, 'rule.manual'));
    const downloadName = translate(locale, settings.downloadRule === 'downloaded' ? 'setting.onlyDownloaded' : 'setting.onlyUndownloaded');
    const waitName = gateState === 'ready' ? '' : gateState === 'waiting'
      ? `${separator}${translate(locale, 'rule.waiting')}` : `${separator}${translate(locale, 'rule.unconfirmed')}`;
    const download = wrap(`${downloadName}${waitName}`);
    let year = wrap(translate(locale, 'rule.manual'));
    if (yearRule.error) year = wrap(translate(locale, 'rule.conflict'));
    else if (yearRule.active) {
      const range = yearRule.min !== null && yearRule.max !== null
        ? (yearRule.min === yearRule.max ? String(yearRule.min) : `${yearRule.min}–${yearRule.max}`)
        : (yearRule.min !== null ? `≥${yearRule.min}` : `≤${yearRule.max}`);
      year = wrap(`${range}${settings.includeMissingYear ? `${separator}${translate(locale, 'rule.missingYear')}` : ''}`);
    }
    return { format, download, year };
  }

  const summaryMessageCache = new WeakMap();

  function renderFilterSummary(list, stats, active, notices = [], cardMetrics = null, locale = 'zh-CN') {
    if (!list) return;
    let summary = list.querySelector('.zble-summary-card');
    if (!active) { summary?.remove(); return; }
    if (!summary) {
      summary = list.ownerDocument.createElement('div');
      summary.className = 'zble-summary-card';
      summary.setAttribute?.('role', 'status');
      list.append(summary);
    }
    const total = stats.total === null ? translate(locale, 'summary.unknown') : String(stats.total);
    const unit = locale.startsWith('zh') ? ' 本' : '';
    const message = `${translate(locale, 'summary.loaded')} ${stats.loaded}${unit}\n${translate(locale, 'summary.matched')} ${stats.matched}${unit}\n${translate(locale, 'summary.total')} ${total}${unit}`;
    const next = notices.length ? `${message}\n${notices.join(locale.startsWith('zh') ? '；' : '; ')}` : message;
    if (summaryMessageCache.get(summary) !== next) {
      if (typeof summary.replaceChildren === 'function') {
        const values = [stats.loaded, stats.matched, stats.total === null ? null : stats.total];
        const keys = ['summary.loaded', 'summary.matched', 'summary.total'];
        const rows = keys.map((key, index) => {
          const row = list.ownerDocument.createElement('div');
          row.className = 'zble-summary-metric';
          const label = list.ownerDocument.createElement('span');
          label.className = 'zble-summary-label';
          label.textContent = translate(locale, key);
          const value = list.ownerDocument.createElement('strong');
          value.className = 'zble-summary-value';
          value.textContent = values[index] === null ? translate(locale, 'summary.unknown')
            : `${new Intl.NumberFormat(locale).format(values[index])}${locale.startsWith('zh') ? ' 本' : ''}`;
          row.append(label, value);
          return row;
        });
        if (notices.length) {
          const notice = list.ownerDocument.createElement('div');
          notice.className = 'zble-summary-notice';
          notice.textContent = notices.join(locale.startsWith('zh') ? '；' : '; ');
          rows.push(notice);
        }
        summary.replaceChildren(...rows);
      } else if (summary.textContent !== next) summary.textContent = next;
      summaryMessageCache.set(summary, next);
    }
    if (cardMetrics && summary.style) {
      if (summary.style.flex !== cardMetrics.flex) summary.style.flex = cardMetrics.flex;
      const minHeight = `${cardMetrics.height}px`;
      if (summary.style.minHeight !== minHeight) summary.style.minHeight = minHeight;
    }
    if (list.children[list.children.length - 1] !== summary) list.append(summary);
  }

  function formatProgressText(stats, locale = 'zh-CN') {
    const remaining = stats.remaining === null ? translate(locale, 'summary.unknown') : stats.remaining;
    const pages = stats.pages === null ? translate(locale, 'summary.unknown') : stats.pages;
    if (stats.loaded === 0) return translate(locale, 'progress.zero', { remaining, pages });
    return translate(locale, 'progress.text', { expansions: stats.approxExpansions,
      current: stats.current, remaining, pages });
  }

  function renderShowMore(main, stats, locale = 'zh-CN') {
    const more = main?.querySelector('.page-load-more');
    if (!more) return;
    let progress = more.querySelector('.zble-progress');
    if (!progress) {
      progress = more.ownerDocument.createElement('span');
      progress.className = 'zble-progress';
      more.append(progress);
    }
    const next = formatProgressText(stats, locale);
    if (progress.textContent !== next) progress.textContent = next;
  }

  function bindDeferredTextInput(element, commit, delay = setTimeout, cancel = clearTimeout) {
    let timer = null;
    let pending = false;
    function flush() {
      if (!pending) return;
      if (timer !== null) cancel(timer);
      timer = null;
      pending = false;
      commit(element.value);
    }
    element.addEventListener('input', () => {
      pending = true;
      if (timer !== null) cancel(timer);
      timer = delay(flush, 250);
    });
    element.addEventListener('keydown', event => {
      if (event.key === 'Enter') { event.preventDefault(); flush(); }
    });
    element.addEventListener('blur', flush);
    return flush;
  }

  function clampPanelPosition(saved, viewport, panelSize) {
    const maxLeft = Math.max(0, viewport.width - panelSize.width - 8);
    const maxTop = Math.max(0, viewport.height - panelSize.height - 8);
    const clamp = (value, max) => Math.min(max, Math.max(0, value));
    if (saved.edge === 'left') return { left: clamp(8, maxLeft), top: clamp(saved.offset, maxTop) };
    if (saved.edge === 'right') return { left: maxLeft, top: clamp(saved.offset, maxTop) };
    if (saved.edge === 'bottom') return { left: clamp(saved.offset, maxLeft), top: maxTop };
    return { left: clamp(saved.offset, maxLeft), top: clamp(8, maxTop) };
  }

  function snapPanelPosition(rect, viewport) {
    const distances = [
      ['top', Math.abs(rect.top)],
      ['right', Math.abs(viewport.width - rect.left - rect.width)],
      ['bottom', Math.abs(viewport.height - rect.top - rect.height)],
      ['left', Math.abs(rect.left)],
    ];
    const edge = distances.reduce((best, item) => item[1] < best[1] ? item : best)[0];
    const offset = edge === 'left' || edge === 'right' ? rect.top : rect.left;
    const position = clampPanelPosition({ edge, offset }, viewport, rect);
    return { edge, offset: edge === 'left' || edge === 'right' ? position.top : position.left, ...position };
  }

  function resetPanelDock(host, settings, save) {
    settings.panelDock = null;
    save();
    for (const property of ['position', 'margin', 'right', 'left', 'top']) host.style.removeProperty(property);
    host.scrollTop = 0;
  }

  function canStartPanelDrag(event) {
    return !event.target.closest('button') && (event.pointerType !== 'mouse' || event.button === 0);
  }

  function createPanelHeaderToggle(toggle) {
    let suppressNextClick = false;
    return {
      onPointerDown() { suppressNextClick = false; },
      onPointerEnd(moved) { suppressNextClick = !!moved; },
      onClick(event) {
        if (suppressNextClick) {
          suppressNextClick = false;
          return;
        }
        if (event.button > 0 || event.detail >= 2 || event.target.closest?.('button')) return;
        toggle();
      },
    };
  }

  function createExclusiveDisclosure(items, flushPending = () => {}) {
    const allowed = new Set(items);
    let open = null;
    function closeAll() {
      if (open !== null) flushPending(open);
      open = null;
    }
    return { current: () => open, closeAll, toggle(id) {
      if (!allowed.has(id)) return open;
      const wasOpen = open === id;
      closeAll();
      if (!wasOpen) open = id;
      return open;
    } };
  }

  function renderFormatBadge(card, extension, show, locale = 'zh-CN') {
    const root = card.shadowRoot;
    if (!root) return false;
    const targets = [...root.querySelectorAll('.meta .idle')];
    if (!targets.length) return false;
    let style = root.querySelector('#zble-format-style');
    if (!style) {
      style = card.ownerDocument.createElement('style');
      style.id = 'zble-format-style';
      style.textContent = '.zble-format{display:inline-block;margin-left:5px;padding:1px 5px;border-radius:4px;background:#245e9b;color:#fff;font-size:11px;font-weight:700;line-height:1.5;vertical-align:middle}:host(:not([data-zble-show-format])) .zble-format{display:none}';
      root.append(style);
    }
    const label = extension ? extension.toUpperCase() : translate(locale, 'hint.unknownFormat');
    for (const idle of targets) {
      let badge = idle.querySelector('.zble-format');
      if (!badge) {
        badge = card.ownerDocument.createElement('span');
        badge.className = 'zble-format';
        idle.append(badge);
      }
      if (badge.textContent !== label) badge.textContent = label;
    }
    if (card.hasAttribute('data-zble-show-format') !== !!show) {
      card.toggleAttribute('data-zble-show-format', !!show);
    }
    return true;
  }

  const originalMeta = new WeakMap();

  function renderCardMeta(card, { showLanguage, showYear }) {
    const root = card.shadowRoot;
    if (!root) return false;
    const idles = ['.meta.desktop .idle', '.meta.mobile .idle']
      .map(selector => root.querySelector(selector)).filter(Boolean);
    if (!idles.length) return false;
    const year = parseYearValue(card.getAttribute('year'));
    const updates = [];
    for (const idle of idles) {
      const node = [...idle.childNodes].find(child => child.nodeType === 3 && child.nodeValue.trim());
      if (!node) {
        const previous = originalMeta.get(idle);
        if (previous?.node && [...idle.childNodes].includes(previous.node)) {
          updates.push(previous);
          continue;
        }
        return false;
      }
      let saved = originalMeta.get(idle);
      if (!saved || saved.node !== node || node.nodeValue !== saved.lastRendered) {
        const original = node.nodeValue;
        const trimmed = original.trim();
        let languageText = trimmed;
        let yearText = '';
        if (year !== null) {
          const suffix = `, ${year}`;
          if (trimmed === String(year)) {
            languageText = '';
            yearText = String(year);
          } else if (trimmed.endsWith(suffix)) {
            languageText = trimmed.slice(0, -suffix.length);
            yearText = String(year);
          } else return false;
        }
        saved = { node, original, languageText, yearText, lastRendered: original };
        originalMeta.set(idle, saved);
      }
      updates.push(saved);
    }
    for (const saved of updates) {
      const next = showLanguage && showYear ? saved.original
        : [showLanguage ? saved.languageText : '', showYear ? saved.yearText : ''].filter(Boolean).join(', ');
      if (saved.node.nodeValue !== next) saved.node.nodeValue = next;
      saved.lastRendered = next;
    }
    return true;
  }

  function renderFullTitle(card, enabled) {
    const root = card.shadowRoot;
    if (!root?.querySelector('.book-info .title')) return false;
    let style = root.querySelector('#zble-title-style');
    if (!style) {
      style = card.ownerDocument.createElement('style');
      style.id = 'zble-title-style';
      style.textContent = ':host([data-zble-full-title]) .book-info{height:auto!important;min-height:88px;overflow:visible!important}:host([data-zble-full-title]) .book-info .title{max-height:none!important;overflow:visible!important;-webkit-line-clamp:unset!important;display:block!important}';
      root.append(style);
    }
    card.toggleAttribute('data-zble-full-title', !!enabled);
    return true;
  }

  function renderFullAuthor(card, enabled) {
    const root = card.shadowRoot;
    if (!root?.querySelector('.book-info .author, .book-info .authors, .book-info .book-author')) return false;
    let style = root.querySelector('#zble-author-style');
    if (!style) {
      style = card.ownerDocument.createElement('style');
      style.id = 'zble-author-style';
      style.textContent = ':host([data-zble-full-author]) .book-info{height:auto!important;min-height:88px;overflow:visible!important}:host([data-zble-full-author]) .book-info .author,:host([data-zble-full-author]) .book-info .authors,:host([data-zble-full-author]) .book-info .book-author{max-height:none!important;overflow:visible!important;-webkit-line-clamp:unset!important;display:block!important;white-space:normal!important}';
      root.append(style);
    }
    card.toggleAttribute('data-zble-full-author', !!enabled);
    return true;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      normalizeExtension, parseCustomFormats, invalidCustomFormats, matchesFormat, hasEffectiveFormatRule,
      sanitizeSettings, parseBookTotal, computeStats, classifyDownload, createDownloadGate,
      getActiveCards, hasBooklistFingerprint, readCardData, compileFilters, evaluateCard, filterActiveCards,
      createRefreshScheduler, createPanelResizeHandler, mutationNeedsRefresh,
      renderFormatBadge, renderCardMeta, renderFullTitle, renderFullAuthor,
      formatRuleSummary, bindDeferredTextInput,
      renderFilterSummary, renderShowMore, formatProgressText,
      snapPanelPosition, clampPanelPosition, resetPanelDock, canStartPanelDrag, createPanelHeaderToggle,
      parseYearRule, matchesYear,
      resolveLocale, translate, sanitizeSitePrefs, TRANSLATION_KEYS, TRANSLATIONS,
      createExclusiveDisclosure,
      classifyPage, noticeRemainingSeconds, shouldShowNotice, classifyBatchProgress, runShowMoreFive,
      collectOpenTargets, canOpenAll, confirmBulkOpen, runOpenAll,
    };
  }

  if (typeof document !== 'undefined') {
    if (window.top && window.self && window.top !== window.self) return;
    let currentRoute = null;
    const noticeSeenInDocument = new Set();
    const SITE_PREFS_KEY = 'zble-site-prefs-v3';

    function loadSitePrefs() {
      try { return sanitizeSitePrefs(GM_getValue(SITE_PREFS_KEY, {})); }
      catch { return sanitizeSitePrefs({}); }
    }

    function saveSitePrefs(prefs) {
      try { GM_setValue(SITE_PREFS_KEY, prefs); } catch { /* Session-only preference. */ }
    }

    function stopRoute() {
      currentRoute?.dispose?.();
      currentRoute = null;
    }

    function startRoute() {
      const location = window.location || { hostname: '', pathname: '/booklist/' };
      const pathname = location.pathname || '/';
      const main = document.querySelector('.booklist-main.active');
      const kind = classifyPage(location.hostname, pathname, hasBooklistFingerprint(document));
      if (currentRoute && currentRoute.kind === kind && currentRoute.pathname === pathname &&
          (kind !== 'booklist' || currentRoute.main === main)) return;
      stopRoute();
      if (kind === 'pending') {
        let observer = null;
        let timeoutId = null;
        if (document.documentElement) {
          observer = new MutationObserver(startRoute);
          observer.observe(document.documentElement, { childList: true, subtree: true });
          timeoutId = setTimeout(() => observer.disconnect(), 30000);
        }
        currentRoute = { kind, pathname, dispose() { observer?.disconnect(); clearTimeout(timeoutId); } };
      } else if (kind === 'booklist') {
        const instance = activate(startRoute);
        currentRoute = { kind, pathname, main, dispose: () => instance.dispose() };
      } else if (kind === 'notice') {
        const host = location.hostname.toLowerCase();
        const prefs = loadSitePrefs();
        let notice = null;
        let sessionStore = null;
        try { sessionStore = window.sessionStorage; } catch { /* Storage access blocked. */ }
        if (document.body && shouldShowNotice(host, prefs[host]?.welcomeEnabled !== false,
            sessionStore, noticeSeenInDocument)) {
          let saved;
          try { saved = GM_getValue('zble-settings-v2', {}); } catch { saved = {}; }
          const locale = resolveLocale(sanitizeSettings(saved).uiLanguage,
            typeof navigator === 'undefined' ? [] : navigator.languages);
          notice = createNotice({ locale, host, now: Date.now, sessionStore,
            sitePrefs: prefs, onDisable() {
              prefs[host] = { welcomeEnabled: false, bulkOpenEnabled: prefs[host]?.bulkOpenEnabled === true };
              saveSitePrefs(prefs);
            } });
        }
        currentRoute = { kind, pathname, dispose: () => notice?.dispose() };
      } else {
        currentRoute = { kind, pathname, dispose() {} };
      }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startRoute, { once: true });
    else startRoute();
    window.addEventListener('pagehide', stopRoute);
    window.addEventListener('pageshow', event => { if (event.persisted) startRoute(); });
    window.addEventListener('popstate', startRoute);
    window.addEventListener('hashchange', startRoute);
    window.addEventListener('urlchange', startRoute);

    function activate(onStale) {
    const STORAGE_KEY = 'zble-settings-v2';
    const initialPathname = window.location?.pathname || '/booklist/';
    const initialMain = document.querySelector('.booklist-main.active');
    let stored;
    try { stored = GM_getValue(STORAGE_KEY, {}); } catch { stored = {}; }
    const settings = sanitizeSettings(stored);
    let locale = resolveLocale(settings.uiLanguage, typeof navigator === 'undefined' ? [] : navigator.languages);
    const sitePrefs = loadSitePrefs();
    const currentHost = window.location?.hostname?.toLowerCase() || '';
    const gate = createDownloadGate();
    let panelRoot = null;
    let timeoutId = null;
    let retryId = null;
    let shadowRetries = 0;
    let observedMain = null;
    let mainObserver = null;
    let parentObserver = null;
    let startupObserver = null;
    let classObservers = [];
    let lastCardMetrics = null;
    let panelResize = null;
    let disposed = false;
    let lastPanelData = null;
    let showMoreTask = null;
    let autoStatus = null;
    let bulkBusy = false;
    let bulkStatus = null;
    let bulkMessageKey = '';
    let hasOpenedOnThisPage = false;
    const automationAbort = new AbortController();

    function isCurrentBooklist() {
      return !disposed && (window.location?.pathname || '/booklist/') === initialPathname &&
        document.querySelector('.booklist-main.active') === initialMain;
    }

    function saveSettings() {
      try { GM_setValue(STORAGE_KEY, { ...settings, formats: [...settings.formats] }); } catch { /* Session still works. */ }
    }

    function siteLibrary() {
      return (typeof unsafeWindow !== 'undefined' ? unsafeWindow : window).ZLibrary;
    }

    const scheduleRefresh = createRefreshScheduler(refresh, requestAnimationFrame);

    function startDownloadTimer() {
      if (timeoutId || gate.state !== 'waiting') return;
      timeoutId = setTimeout(() => {
        timeoutId = null;
        gate.onTimeout();
        scheduleRefresh();
      }, 30000);
    }

    function onMarksLoaded() {
      const library = siteLibrary();
      gate.onMarksLoaded(library?._?.downloaded);
      if (gate.state === 'ready' && typeof library?.checkIsDownloaded !== 'function') {
        gate.onFailure();
      }
      if (gate.state === 'ready') {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      scheduleRefresh();
    }

    // The event is registered before DOMContentLoaded, but an already-populated
    // positive map is also usable if the userscript manager starts late.
    document.addEventListener('marksLoaded', onMarksLoaded);

    function setText(selector, value) {
      const element = panelRoot?.querySelector(selector);
      if (element && element.textContent !== value) element.textContent = value;
    }

    function syncDownloadControl() {
      const input = panelRoot?.querySelector('#zble-download-switch');
      if (!input) return;
      input.checked = settings.filterDownload;
      input.disabled = gate.state !== 'ready';
      panelRoot.querySelector('#zble-wait-icon').hidden = gate.state !== 'waiting';
      panelRoot.querySelector('#zble-warn-icon').hidden = !['timed-out', 'failed'].includes(gate.state);
    }

    function renderPanelState(context, unknownCards, unavailable) {
      const summaries = formatRuleSummary(settings, gate.state, context.yearRule, locale);
      for (const name of ['format', 'download', 'year']) {
        setText(`#zble-${name}-summary`, summaries[name]);
      }
      setText('#zble-format-hint', settings.filterFormat && !context.formatActive
        ? translate(locale, 'hint.formatEmpty')
        : invalidCustomFormats(settings.custom).length ? translate(locale, 'hint.invalidCustom') : '');
      setText('#zble-year-hint', settings.filterYear
        ? (context.yearRule.error ? translate(locale, 'rule.conflict')
          : !context.yearRule.active ? translate(locale, 'hint.yearEmpty') : '') : '');
      const downloadMessage = gate.state === 'waiting'
        ? translate(locale, gate.ambiguous ? 'hint.downloadAmbiguous' : 'hint.downloadWaiting')
        : gate.state === 'timed-out' ? translate(locale, 'hint.downloadTimeout')
          : gate.state === 'failed' ? translate(locale, 'hint.downloadFailed')
            : unknownCards ? translate(locale, 'hint.downloadUnknown') : '';
      setText('#zble-download-hint', downloadMessage);
      setText('#zble-info-hint', unavailable.format || unavailable.meta || unavailable.title || unavailable.author
        ? translate(locale, 'hint.structure') : '');
      syncDownloadControl();
    }

    function translatedNotices(context) {
      const notices = [];
      if (settings.filterFormat && !context.formatActive) notices.push(translate(locale, 'hint.formatPending'));
      if (settings.filterDownload && gate.state !== 'ready') notices.push(translate(locale, 'hint.downloadPaused'));
      if (settings.filterYear && !context.yearActive) notices.push(translate(locale,
        context.yearRule.error ? 'rule.conflict' : 'hint.yearPending'));
      return notices;
    }

    function renderAutoStatus() {
      if (!autoStatus) return;
      const suffix = autoStatus.reason === 'end' ? translate(locale, 'auto.showMoreEnd')
        : autoStatus.reason === 'timeout' ? translate(locale, 'auto.showMoreTimeout')
          : autoStatus.reason === 'button-unavailable' ? translate(locale, 'auto.showMoreUnavailable')
            : ['error', 'source-gone'].includes(autoStatus.reason) ? translate(locale, 'auto.showMoreError') : '';
      setText('#zble-auto-status', `${translate(locale, 'auto.showMoreStatus', autoStatus)} ${suffix}`.trim());
    }

    function isCardSiteVisible(card) {
      if (!card.getClientRects?.().length) return false;
      const style = getComputedStyle(card);
      return style.display !== 'none' && style.visibility !== 'hidden';
    }

    function currentOpenTargets() {
      if (!isCurrentBooklist()) return [];
      return collectOpenTargets(getActiveCards(document), window.location.origin, isCardSiteVisible);
    }

    function currentFilterSignature() {
      return JSON.stringify({ filterFormat: settings.filterFormat, formats: settings.formats,
        custom: settings.custom, filterDownload: settings.filterDownload, downloadRule: settings.downloadRule,
        filterYear: settings.filterYear, yearMin: settings.yearMin, yearMax: settings.yearMax,
        includeMissingYear: settings.includeMissingYear, downloadState: gate.state });
    }

    function currentBulkGate() {
      const context = lastPanelData?.context;
      const filtersReady = !!context && (!settings.filterFormat || context.formatActive) &&
        (!settings.filterYear || context.yearActive) &&
        (!settings.filterDownload || gate.state === 'ready');
      return canOpenAll({ enabled: sitePrefs[currentHost]?.bulkOpenEnabled === true,
        filtersReady, unknownDownloads: lastPanelData?.unknownCards || 0,
        openTabAvailable: typeof GM_openInTab === 'function' });
    }

    function syncBulkControl() {
      const button = panelRoot?.querySelector('#zble-open-all');
      if (!button) return;
      const gateResult = currentBulkGate();
      const targets = gateResult.allowed ? currentOpenTargets() : [];
      button.disabled = bulkBusy || !!showMoreTask || !gateResult.allowed || targets.length === 0;
      const reasons = { disabled: 'auto.bulkDisabled', 'api-unavailable': 'auto.bulkApi',
        'filters-pending': 'auto.bulkFilters', 'unknown-downloads': 'auto.bulkUnknown' };
      setText('#zble-open-hint', gateResult.allowed
        ? (targets.length ? '' : translate(locale, 'auto.bulkEmpty'))
        : translate(locale, reasons[gateResult.reason]));
    }

    function renderBulkStatus() {
      setText('#zble-open-status', bulkMessageKey ? translate(locale, bulkMessageKey)
        : bulkStatus ? translate(locale, 'auto.bulkProgress', bulkStatus) : '');
    }

    function showBulkDialog(step, { count, repeat }) {
      return new Promise(resolve => {
        if (automationAbort.signal.aborted || !isCurrentBooklist()) { resolve(false); return; }
        const previousFocus = panelRoot?.activeElement || document.activeElement;
        const host = document.createElement('div');
        host.id = 'zble-bulk-dialog-host';
        const root = host.attachShadow({ mode: 'open' });
        root.innerHTML = `<style>
          :host{all:initial;position:fixed;inset:0;z-index:2147483002;display:grid;place-items:center;padding:16px;background:#0008;font:15px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif;color-scheme:light}
          *{box-sizing:border-box}.dialog{width:min(440px,100%);max-height:calc(100vh - 32px);overflow:auto;padding:20px;border:2px solid #347aad;border-radius:10px;background:#fff;color:#172534;box-shadow:0 12px 36px #0006;overflow-wrap:anywhere}
          h2{font-size:17px;margin:0 0 12px}p{margin:0 0 18px}.actions{display:flex;justify-content:flex-end;flex-wrap:wrap;gap:8px}button{font:inherit;padding:7px 12px;border:1px solid #6b99bc;border-radius:6px;background:#f0f6fb;color:#143a59;cursor:pointer}button:last-child{background:#1667a7;color:#fff;border-color:#1667a7}button:focus-visible{outline:3px solid #4da3ea;outline-offset:2px}
          @media(prefers-color-scheme:dark){:host{color-scheme:dark}.dialog{background:#1b2430;color:#eef3f8;border-color:#74b4e7}button{background:#263d50;color:#eef3f8;border-color:#78a5c6}button:last-child{background:#1b6a9c}}
          @media(forced-colors:active){.dialog{border-color:Highlight;box-shadow:none}button:focus-visible{outline-color:Highlight}}
        </style><div class="dialog" role="dialog" aria-modal="true" aria-labelledby="zble-bulk-title" aria-describedby="zble-bulk-message"><h2 id="zble-bulk-title"></h2><p id="zble-bulk-message"></p><div class="actions"><button id="zble-bulk-cancel" type="button"></button><button id="zble-bulk-confirm" type="button"></button></div></div>`;
        const cancel = root.querySelector('#zble-bulk-cancel');
        const confirm = root.querySelector('#zble-bulk-confirm');
        root.querySelector('#zble-bulk-title').textContent = translate(locale, 'auto.openAll');
        root.querySelector('#zble-bulk-message').textContent = step === 1
          ? `${translate(locale, 'auto.firstWarning', { count })}${repeat ? `\n${translate(locale, 'auto.repeatWarning', { count })}` : ''}`
          : translate(locale, 'auto.secondWarning');
        cancel.textContent = translate(locale, 'auto.cancel');
        confirm.textContent = translate(locale, 'auto.continue');
        document.body.append(host);
        let settled = false;
        function finish(value) {
          if (settled) return;
          settled = true;
          automationAbort.signal.removeEventListener('abort', abort);
          host.remove();
          previousFocus?.focus?.();
          resolve(value);
        }
        function abort() { finish(false); }
        cancel.addEventListener('click', () => finish(false));
        confirm.addEventListener('click', () => finish(true));
        root.addEventListener('keydown', event => {
          if (event.key === 'Escape') { event.preventDefault(); finish(false); }
          if (event.key === 'Tab') {
            if (event.shiftKey && root.activeElement === cancel) { event.preventDefault(); confirm.focus(); }
            else if (!event.shiftKey && root.activeElement === confirm) { event.preventDefault(); cancel.focus(); }
          }
        });
        automationAbort.signal.addEventListener('abort', abort, { once: true });
        cancel.focus();
      });
    }

    function refreshPanelLocale(nextLocale = locale) {
      locale = nextLocale;
      if (!panelRoot) return;
      for (const node of panelRoot.querySelectorAll('[data-i18n]')) {
        const value = translate(locale, node.dataset.i18n);
        if (node.textContent !== value) node.textContent = value;
      }
      for (const card of getActiveCards(document))
        renderFormatBadge(card, normalizeExtension(card.getAttribute('extension')), settings.showFormat, locale);
      const gear = panelRoot.querySelector('#zble-gear');
      const collapse = panelRoot.querySelector('#zble-collapse');
      for (const [node, key] of [[gear, 'action.globalSettings'],
        [collapse, panelRoot.querySelector('#zble-content').hidden ? 'action.expand' : 'action.collapse'],
        [panelRoot.querySelector('#zble-wait-icon'), 'action.waitDownload'],
        [panelRoot.querySelector('#zble-warn-icon'), 'action.downloadUnconfirmed']]) {
        node?.setAttribute('aria-label', translate(locale, key));
        if (node === gear || node === collapse) node?.setAttribute('title', translate(locale, key));
      }
      for (const [name, key] of [['format', 'action.configureFormat'],
        ['download', 'action.configureDownload'], ['year', 'action.configureYear']]) {
        const control = panelRoot.querySelector(`#zble-configure-${name}`);
        control?.setAttribute('aria-label', translate(locale, key));
        control?.setAttribute('title', translate(locale, key));
      }
      for (const [selector, key] of [['#zble-custom', 'setting.custom'], ['#zble-year-min', 'setting.minYear'],
        ['#zble-year-max', 'setting.maxYear']]) panelRoot.querySelector(selector)?.setAttribute('aria-label', translate(locale, key));
      panelRoot.querySelector('#zble-custom')?.setAttribute('placeholder', translate(locale, 'setting.customPlaceholder'));
      for (const selector of ['#zble-year-min', '#zble-year-max'])
        panelRoot.querySelector(selector)?.setAttribute('placeholder', translate(locale, 'setting.yearPlaceholder'));
      if (lastPanelData) {
        const { context, unknownCards, unavailable, stats, activeFilter, list, main } = lastPanelData;
        renderPanelState(context, unknownCards, unavailable);
        renderFilterSummary(list, stats, activeFilter, translatedNotices(context), lastCardMetrics, locale);
        renderShowMore(main, stats, locale);
      }
      renderAutoStatus();
      renderBulkStatus();
      syncBulkControl();
    }

    function refresh() {
      if (!panelRoot || disposed) return;
      if (!isCurrentBooklist()) { onStale(); return; }
      attachObservers();
      const main = document.querySelector('.booklist-main.active');
      const library = siteLibrary();
      const lookup = typeof library?.checkIsDownloaded === 'function'
        ? library.checkIsDownloaded.bind(library) : null;
      const context = compileFilters(settings, gate.state === 'ready', lookup);
      const pass = filterActiveCards(document, context);
      const { cards } = pass;
      const totalText = document.querySelector('.booklist-header__tabs tab')?.textContent || '';
      const parsedTotal = parseBookTotal(totalText);
      const pageReady = !!main && (cards.length > 0 || parsedTotal === 0);
      if (pageReady) startDownloadTimer();
      const list = main?.querySelector('.readlist-view');
      const previousSummary = list?.querySelector('.zble-summary-card');
      if (previousSummary) previousSummary.style.minHeight = '0px';
      let unknownCards = 0;
      const unavailable = { format: 0, meta: 0, title: 0, author: 0 };
      let lastVisibleCard = null;
      let fallbackMetrics = null;
      for (let index = 0; index < cards.length; index++) {
        const card = cards[index];
        const info = pass.infos[index];
        if (!renderFormatBadge(card, info.extension, settings.showFormat, locale)) unavailable.format++;
        if (!renderCardMeta(card, settings)) unavailable.meta++;
        if (!renderFullTitle(card, settings.showFullTitle)) unavailable.title++;
        if (!renderFullAuthor(card, settings.showFullAuthor) && settings.showFullAuthor) unavailable.author++;
        const result = pass.results[index];
        if (result.visible) lastVisibleCard = card;
        if (!fallbackMetrics && !card.classList.contains('zble-hidden')) {
          const rect = card.getBoundingClientRect();
          if (rect.width && rect.height) fallbackMetrics = { flex: getComputedStyle(card).flex, height: rect.height };
        }
        if (settings.filterDownload && gate.state === 'ready' && result.download === 'unknown') unknownCards++;
        if (card.classList.contains('zble-hidden') === result.visible) {
          card.classList.toggle('zble-hidden', !result.visible);
        }
      }
      const stats = computeStats({ loaded: cards.length, matched: pass.matched, total: parsedTotal });
      const activeFilter = settings.filterFormat || settings.filterDownload || settings.filterYear;
      const notices = translatedNotices(context);
      if (lastVisibleCard) {
        const rect = lastVisibleCard.getBoundingClientRect();
        if (rect.width && rect.height) lastCardMetrics = { flex: getComputedStyle(lastVisibleCard).flex, height: rect.height };
      } else if (fallbackMetrics) lastCardMetrics = fallbackMetrics;
      renderFilterSummary(list, stats, activeFilter, notices, lastCardMetrics, locale);
      renderShowMore(main, stats, locale);
      const pendingShadow = unavailable.format + unavailable.meta + unavailable.title + unavailable.author;
      const shownUnavailable = shadowRetries >= 20 ? unavailable : { format: 0, meta: 0, title: 0, author: 0 };
      renderPanelState(context, unknownCards, shownUnavailable);
      lastPanelData = { context, unknownCards, unavailable: shownUnavailable, stats, activeFilter, list, main };
      syncBulkControl();
      if (pendingShadow && shadowRetries < 20 && !retryId) {
        shadowRetries++;
        retryId = setTimeout(() => { retryId = null; scheduleRefresh(); }, 250);
      } else if (!pendingShadow) shadowRetries = 0;
    }

    function attachObservers() {
      const main = document.querySelector('.booklist-main.active');
      if (main === observedMain) return;
      mainObserver?.disconnect();
      parentObserver?.disconnect();
      for (const observer of classObservers) observer.disconnect();
      classObservers = [];
      observedMain = main;
      lastCardMetrics = null;
      if (!main) return;
      startupObserver?.disconnect();
      startupObserver = null;
      mainObserver = new MutationObserver(records => { if (mutationNeedsRefresh(records)) scheduleRefresh(); });
      mainObserver.observe(main, { childList: true, subtree: true, attributes: true, attributeFilter: ['extension', 'year', 'language'] });
      if (main.parentElement) {
        parentObserver = new MutationObserver(scheduleRefresh);
        parentObserver.observe(main.parentElement, { childList: true });
        for (const sibling of main.parentElement.querySelectorAll('.booklist-main')) {
          const observer = new MutationObserver(scheduleRefresh);
          observer.observe(sibling, { attributes: true, attributeFilter: ['class'] });
          classObservers.push(observer);
        }
      }
    }

    function createPanel() {
      if (document.getElementById('zble-panel-host')) return;
      const pageStyle = document.createElement('style');
      pageStyle.id = 'zble-page-style';
      pageStyle.textContent = '.booklist-main.active .readlist-view > z-bookcard.zble-hidden{display:none!important}.booklist-main.active .readlist-view > .zble-summary-card{display:flex;flex-direction:column;justify-content:center;align-items:stretch;gap:14px;box-sizing:border-box;flex:0 0 23%;min-height:320px;max-width:100%;padding:25px 22px;border:1px solid var(--card-border-color,#d3dce5);border-top:4px solid #2d79b8;border-radius:8px;background:var(--card-bg-color,#fff);box-shadow:var(--box-shadow,0 2px 6px #0001);color:var(--gray-9,#243747);font:14px/1.5 system-ui,sans-serif;overflow-wrap:anywhere}.booklist-main.active .zble-summary-metric{display:flex;flex-direction:column;gap:2px;border-bottom:1px solid #9baebf66;padding-bottom:10px}.booklist-main.active .zble-summary-label{font-size:12px;opacity:.8}.booklist-main.active .zble-summary-value{font-size:23px;line-height:1.2;font-weight:750}.booklist-main.active .zble-summary-notice{font-size:12px;line-height:1.45;color:#a64b27}.booklist-main.active .page-load-more .zble-progress{display:block;font-size:12px;line-height:1.4;opacity:.82;white-space:normal}@media(prefers-color-scheme:dark){.booklist-main.active .readlist-view > .zble-summary-card{background:#222e3c;color:#edf3f8;border-color:#526b7f;border-top-color:#82bfff;box-shadow:0 2px 10px #0006}.booklist-main.active .zble-summary-notice{color:#ffbd93}}@media(forced-colors:active){.booklist-main.active .readlist-view > .zble-summary-card{border:2px solid Highlight;box-shadow:none}.booklist-main.active .zble-summary-metric{border-bottom-color:CanvasText}}';
      (document.head || document.documentElement).append(pageStyle);

      const host = document.createElement('div');
      host.id = 'zble-panel-host';
      for (const eventName of ['click', 'change', 'input', 'pointerdown']) {
        host.addEventListener(eventName, event => {
          if (isCurrentBooklist()) return;
          event.stopImmediatePropagation();
          event.preventDefault();
          onStale();
        }, true);
      }
      const main = document.querySelector('.booklist-main.active');
      if (main?.parentElement) main.parentElement.insertBefore(host, main);
      else document.body.append(host);
      panelRoot = host.attachShadow({ mode: 'open' });
      panelRoot.innerHTML = `
        <style>
          :host{all:initial;--zble-bg:#fff;--zble-text:#172534;--zble-border:#9baebf;--zble-accent-bg:#dcecff;--zble-accent:#075da5;--zble-line:#e0e7ee;--zble-group:#36546c;--zble-muted:#526777;--zble-spinner:#aebdca;--zble-settings-bg:#f0f6fb;--zble-settings-border:#b5cede;--zble-settings-title:#174f78;--zble-field-border:#90aaba;--zble-field-bg:#fff;--zble-hint:#4c5d6c;--zble-error:#9d311f;position:fixed;z-index:2147483000;right:10px;top:10px;width:min(315px,calc(100vw - 20px));max-height:calc(100vh - 20px);overflow:auto;box-sizing:border-box;border:1px solid var(--zble-border);border-radius:10px;background:var(--zble-bg);color:var(--zble-text);color-scheme:light;box-shadow:0 5px 20px #0003;font:13px/1.45 system-ui,-apple-system,"Segoe UI",sans-serif}
          @media(prefers-color-scheme:dark){:host{--zble-bg:#1b2430;--zble-text:#eef3f8;--zble-border:#586e80;--zble-accent-bg:#25445d;--zble-accent:#9bd3ff;--zble-line:#3e5262;--zble-group:#c2def0;--zble-muted:#bbcbd7;--zble-spinner:#7f96a8;--zble-settings-bg:#253545;--zble-settings-border:#577083;--zble-settings-title:#b7ddff;--zble-field-border:#7595aa;--zble-field-bg:#172330;--zble-hint:#cfdae2;--zble-error:#ffb0a3;color-scheme:dark;box-shadow:0 5px 20px #0008}}
          @media(max-width:600px){:host{display:block;position:relative;right:auto;top:auto;width:calc(100% - 20px);max-height:70vh;margin:10px auto 14px}}
          *{box-sizing:border-box}[hidden]{display:none!important}.body{padding:10px 12px}.head{display:flex;align-items:center;justify-content:space-between;touch-action:none;cursor:grab;user-select:none}.title{font-weight:700;font-size:14px}.head-actions{display:flex;align-items:center;gap:2px}
          button{background:transparent;border:0;border-radius:6px;color:inherit;cursor:pointer;font-size:20px;padding:2px 6px}button[aria-expanded="true"]{background:var(--zble-accent-bg);color:var(--zble-accent)}button:focus-visible,input:focus-visible,select:focus-visible{outline:2px solid var(--zble-accent);outline-offset:2px}.chevron{display:block;width:18px;height:18px;transition:transform .15s ease}#zble-collapse[aria-expanded="false"] .chevron{transform:rotate(180deg)}@media(prefers-reduced-motion:reduce){.chevron{transition:none}}
          .group{border-top:1px solid var(--zble-line);padding-top:7px;margin-top:7px}.group-title{font-weight:700;color:var(--zble-group);font-size:12px;letter-spacing:.02em}.row{display:flex;align-items:flex-start;gap:7px;margin:6px 0;cursor:pointer}.row input{margin-top:3px;flex:none}.row:has(input:disabled){opacity:.62;cursor:not-allowed}input[type=checkbox]{accent-color:var(--zble-accent)}.summary{color:var(--zble-muted);font-size:11px;margin-left:2px;overflow-wrap:anywhere}
          .spin{display:inline-block;width:13px;height:13px;border:2px solid var(--zble-spinner);border-top-color:var(--zble-accent);border-radius:50%;animation:rotate .8s linear infinite;flex:none;margin-top:3px}@keyframes rotate{to{transform:rotate(360deg)}}@media(prefers-reduced-motion:reduce){.spin{animation:none;border:0;width:auto;height:auto}.spin:after{content:'⏳'}}
          .settings{background:var(--zble-settings-bg);border:1px solid var(--zble-settings-border);border-radius:8px;margin-top:10px;padding:10px}.settings-title{font-weight:700;color:var(--zble-settings-title);margin-bottom:8px}.configuration{background:var(--zble-field-bg);border:1px solid var(--zble-accent);border-left:4px solid var(--zble-accent);border-radius:7px;margin:3px 0 10px;padding:8px}.configuration-title{font-weight:700;color:var(--zble-accent);font-size:11px}.filter-row{display:flex;align-items:center;gap:3px}.filter-row>.row{flex:1;min-width:0}.configure{font-size:14px;line-height:1;padding:5px;flex:none}.configure svg,.tool-icon{width:18px;height:18px;display:block}.setting-label{display:block;font-weight:600;margin-top:10px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin:6px 0}.grid label{white-space:nowrap}
          input[type=text],select{width:100%;padding:5px;border:1px solid var(--zble-field-border);border-radius:5px;font:inherit;color:inherit;background:var(--zble-field-bg)}.year-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.hint{font-size:11px;color:var(--zble-hint);margin:4px 0 7px;overflow-wrap:anywhere}.hint:empty{display:none}.hint a{color:var(--zble-accent)}.error{color:var(--zble-error)}.reset-position{font-size:12px;border:1px solid var(--zble-field-border);background:var(--zble-field-bg);margin:6px 0;padding:4px 8px}.action-button{display:block;width:100%;font-size:12px;text-align:left;border:1px solid var(--zble-field-border);background:var(--zble-field-bg);margin:6px 0;padding:7px 9px}.action-button:disabled{opacity:.55;cursor:not-allowed}
        </style>
        <div class="body">
          <div class="head"><span class="title">Z-lib Booklist Enhancer</span><div class="head-actions"><button id="zble-gear" type="button" title="全局设置" aria-label="全局设置" aria-controls="zble-settings" aria-expanded="false"><svg class="tool-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M21 3a6 6 0 0 1-8 7.6L6 17.6 3.4 21 3 18l7-7A6 6 0 0 1 17 3l-3 3 4 4z"/></svg></button><button id="zble-collapse" type="button" title="折叠面板" aria-label="折叠面板" aria-controls="zble-content" aria-expanded="true"><svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 14 L12 9 L20 14"/></svg></button></div></div>
          <div id="zble-content">
          <div class="group"><div class="group-title" data-i18n="section.filters">筛选器</div>
            <div class="filter-row"><label class="row"><input id="zble-format-switch" type="checkbox"><span><span data-i18n="control.filterFormat">只显示指定文件格式</span> <span id="zble-format-summary" class="summary"></span></span></label><button id="zble-configure-format" class="configure" type="button" aria-controls="zble-format-config" aria-expanded="false" aria-label="配置文件格式筛选"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false"><path d="M10 2h4l.7 2.4 2 1.2 2.4-.6 2 3.5-1.7 1.8v2.4l1.7 1.8-2 3.5-2.4-.6-2 1.2L14 21h-4l-.7-2.4-2-1.2-2.4.6-2-3.5 1.7-1.8v-2.4L2.9 8.5l2-3.5 2.4.6 2-1.2z"/><circle cx="12" cy="11.5" r="3"/></svg></button></div>
            <div id="zble-format-hint" class="hint error" role="status"></div>
            <div id="zble-format-config" class="configuration" hidden><div class="configuration-title" data-i18n="section.configuration">筛选配置</div><div class="setting-label" data-i18n="setting.formats">筛选文件格式（可多选）</div><div class="grid"><label><input type="checkbox" data-format="pdf"> PDF</label><label><input type="checkbox" data-format="epub"> EPUB</label><label><input type="checkbox" data-format="azw3"> AZW3</label><label><input type="checkbox" data-format="mobi"> MOBI</label><label><input type="checkbox" data-format="other"> <span data-i18n="setting.other">其他全部</span></label><label><input type="checkbox" data-format="custom"> <span data-i18n="setting.custom">自定义</span></label></div><input id="zble-custom" type="text" aria-label="自定义文件格式" placeholder="如 djvu, txt; fb2"><div class="hint" data-i18n="setting.customHint">自定义格式用逗号或分号分隔。</div></div>
            <div class="filter-row"><label class="row"><input id="zble-download-switch" type="checkbox"><span><span data-i18n="control.filterDownload">只显示指定下载状态</span> <span id="zble-download-summary" class="summary"></span></span><span id="zble-wait-icon" class="spin" aria-label="等待下载状态"></span><span id="zble-warn-icon" hidden aria-label="下载状态未确认">⚠️</span></label><button id="zble-configure-download" class="configure" type="button" aria-controls="zble-download-config" aria-expanded="false" aria-label="配置下载状态筛选"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false"><path d="M10 2h4l.7 2.4 2 1.2 2.4-.6 2 3.5-1.7 1.8v2.4l1.7 1.8-2 3.5-2.4-.6-2 1.2L14 21h-4l-.7-2.4-2-1.2-2.4.6-2-3.5 1.7-1.8v-2.4L2.9 8.5l2-3.5 2.4.6 2-1.2z"/><circle cx="12" cy="11.5" r="3"/></svg></button></div>
            <div id="zble-download-hint" class="hint error" role="status"></div>
            <div id="zble-download-config" class="configuration" hidden><div class="configuration-title" data-i18n="section.configuration">筛选配置</div><label class="setting-label" for="zble-download-rule" data-i18n="setting.downloadRule">下载状态规则</label><select id="zble-download-rule"><option value="not-downloaded" data-i18n="setting.onlyUndownloaded">仅未下载</option><option value="downloaded" data-i18n="setting.onlyDownloaded">仅已下载</option></select></div>
            <div class="filter-row"><label class="row"><input id="zble-year-filter-switch" type="checkbox"><span><span data-i18n="control.filterYear">只显示指定年份的书籍</span> <span id="zble-year-summary" class="summary"></span></span></label><button id="zble-configure-year" class="configure" type="button" aria-controls="zble-year-config" aria-expanded="false" aria-label="配置年份筛选"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false"><path d="M10 2h4l.7 2.4 2 1.2 2.4-.6 2 3.5-1.7 1.8v2.4l1.7 1.8-2 3.5-2.4-.6-2 1.2L14 21h-4l-.7-2.4-2-1.2-2.4.6-2-3.5 1.7-1.8v-2.4L2.9 8.5l2-3.5 2.4.6 2-1.2z"/><circle cx="12" cy="11.5" r="3"/></svg></button></div>
            <div id="zble-year-hint" class="hint error" role="status"></div>
            <div id="zble-year-config" class="configuration" hidden><div class="configuration-title" data-i18n="section.configuration">筛选配置</div><div class="setting-label" data-i18n="setting.yearRange">出版年份范围（含端点）</div><div class="year-grid"><label><span data-i18n="setting.minYear">最小年份</span><input id="zble-year-min" type="text" inputmode="numeric" aria-label="最小年份" placeholder="留空不限"></label><label><span data-i18n="setting.maxYear">最大年份</span><input id="zble-year-max" type="text" inputmode="numeric" aria-label="最大年份" placeholder="留空不限"></label></div><div class="hint" data-i18n="setting.yearHint">输入后停顿或按回车生效；可只填一端。</div><label class="row"><input id="zble-missing-year" type="checkbox"><span data-i18n="setting.missingYear">显示年份缺失的书籍</span></label></div>
          </div>
          <div class="group"><div class="group-title" data-i18n="section.info">信息显示</div>
            <label class="row"><input id="zble-show-switch" type="checkbox"><span data-i18n="control.formatBadge">文件格式标签</span></label>
            <label class="row"><input id="zble-language-switch" type="checkbox"><span data-i18n="control.language">书籍语言（页面自带）</span></label>
            <label class="row"><input id="zble-year-show-switch" type="checkbox"><span data-i18n="control.year">书籍年份（页面自带）</span></label>
            <label class="row"><input id="zble-title-switch" type="checkbox"><span data-i18n="control.fullTitle">完整显示超长书名</span></label>
            <label class="row"><input id="zble-author-switch" type="checkbox"><span data-i18n="control.fullAuthor">完整显示超长作者名</span></label>
            <div id="zble-info-hint" class="hint error" role="status"></div>
          </div>
          <div class="group"><div class="group-title" data-i18n="section.automation">自动化（beta）</div><div id="zble-automation-actions"><button id="zble-show-more-five" class="action-button" type="button" data-i18n="auto.showMore">连点 5 次 Show more</button><div id="zble-auto-status" class="hint" role="status"></div><button id="zble-open-all" class="action-button" type="button" data-i18n="auto.openAll" disabled>打开当前视图的所有图书页面</button><div id="zble-open-hint" class="hint" role="status"></div><div id="zble-open-status" class="hint" role="status"></div><button id="zble-favorite" class="action-button" type="button" disabled><span data-i18n="auto.favorite">批量加入收藏</span> · <span data-i18n="auto.dev">开发中</span></button></div></div>
          <div id="zble-settings" class="settings" hidden>
            <div class="settings-title" data-i18n="action.globalSettings">全局设置</div>
            <label class="setting-label" for="zble-ui-language" data-i18n="setting.language">界面语言</label>
            <select id="zble-ui-language"><option value="auto" data-i18n="setting.autoLanguage">跟随浏览器/系统</option><option value="en">English</option><option value="zh-CN">简体中文</option><option value="zh-TW">繁體中文</option><option value="fr">Français</option><option value="de">Deutsch</option><option value="ru">Русский</option><option value="ja">日本語</option><option value="ko">한국어</option><option value="es">Español</option><option value="pt-BR">Português (Brasil)</option></select>
            <label class="row"><input id="zble-show-notice" type="checkbox"><span data-i18n="setting.showNotice">在本站显示启动提示</span></label>
            <label class="row"><input id="zble-allow-bulk" type="checkbox"><span data-i18n="setting.allowBulk">在本站启用批量打开</span></label>
            <button id="zble-reset-position" class="reset-position" type="button" data-i18n="setting.resetPosition">重置浮窗位置</button>
            <div class="hint" data-i18n="setting.userMatches">其他镜像：请在 Tampermonkey 中添加 User matches。</div>
            <div class="group"><div class="settings-title" data-i18n="section.about">关于</div><div class="hint" data-i18n="about.description">为 Z-Library 书单提供灵活筛选、信息显示和自选自动化操作。</div><div class="hint"><span data-i18n="about.developer">开发者</span>：<span data-i18n="about.placeholder">待填写</span></div><div class="hint"><span data-i18n="about.github">GitHub 页面</span>：<span data-i18n="about.placeholder">待填写</span></div></div>
          </div>
          </div>
        </div>`;

      const immediate = [
        ['#zble-show-switch', 'showFormat'], ['#zble-language-switch', 'showLanguage'],
        ['#zble-year-show-switch', 'showYear'], ['#zble-title-switch', 'showFullTitle'],
        ['#zble-author-switch', 'showFullAuthor'],
        ['#zble-format-switch', 'filterFormat'], ['#zble-download-switch', 'filterDownload'],
        ['#zble-year-filter-switch', 'filterYear'], ['#zble-missing-year', 'includeMissingYear'],
      ];
      for (const [selector, key] of immediate) {
        const input = panelRoot.querySelector(selector);
        input.checked = settings[key];
        input.addEventListener('change', () => { settings[key] = input.checked; saveSettings(); scheduleRefresh(); });
      }
      const languageSelect = panelRoot.querySelector('#zble-ui-language');
      languageSelect.value = settings.uiLanguage;
      languageSelect.addEventListener('change', () => {
        settings.uiLanguage = languageSelect.value;
        saveSettings();
        refreshPanelLocale(resolveLocale(settings.uiLanguage,
          typeof navigator === 'undefined' ? [] : navigator.languages));
      });
      const noticeInput = panelRoot.querySelector('#zble-show-notice');
      noticeInput.checked = sitePrefs[currentHost]?.welcomeEnabled !== false;
      noticeInput.closest('label').hidden = !KNOWN_HOSTS.has(currentHost);
      noticeInput.addEventListener('change', () => {
        sitePrefs[currentHost] = { welcomeEnabled: noticeInput.checked,
          bulkOpenEnabled: sitePrefs[currentHost]?.bulkOpenEnabled === true };
        saveSitePrefs(sitePrefs);
      });
      const bulkInput = panelRoot.querySelector('#zble-allow-bulk');
      bulkInput.checked = sitePrefs[currentHost]?.bulkOpenEnabled === true;
      bulkInput.addEventListener('change', () => {
        sitePrefs[currentHost] = { welcomeEnabled: sitePrefs[currentHost]?.welcomeEnabled !== false,
          bulkOpenEnabled: bulkInput.checked };
        saveSitePrefs(sitePrefs);
        syncBulkControl();
      });
      for (const input of panelRoot.querySelectorAll('[data-format]')) {
        input.checked = settings.formats.includes(input.dataset.format);
        input.addEventListener('change', () => {
          settings.formats = [...panelRoot.querySelectorAll('[data-format]:checked')].map(item => item.dataset.format);
          saveSettings(); scheduleRefresh();
        });
      }
      const showMoreButton = panelRoot.querySelector('#zble-show-more-five');
      showMoreButton.addEventListener('click', () => {
        if (showMoreTask || bulkBusy || !isCurrentBooklist()) return;
        showMoreButton.disabled = true;
        syncBulkControl();
        const mainForTask = document.querySelector('.booklist-main.active');
        const listForTask = mainForTask?.querySelector('.readlist-view');
        showMoreTask = runShowMoreFive({
          getCards: () => listForTask ? [...listForTask.querySelectorAll(':scope > z-bookcard')] : [],
          findButton: () => mainForTask?.querySelector('.page-load-more'),
          observe(callback) {
            const observer = new MutationObserver(callback);
            observer.observe(mainForTask, { childList: true, subtree: true });
            return () => observer.disconnect();
          },
          isSourceAlive: isCurrentBooklist,
          signal: automationAbort.signal,
          onProgress(progress) { autoStatus = progress; renderAutoStatus(); },
        }).then(result => {
          autoStatus = result;
          renderAutoStatus();
          return result;
        }).finally(() => {
          showMoreTask = null;
          if (!disposed) showMoreButton.disabled = false;
          syncBulkControl();
        });
      });
      const openAllButton = panelRoot.querySelector('#zble-open-all');
      openAllButton.addEventListener('click', async () => {
        if (bulkBusy || showMoreTask || !isCurrentBooklist() || !currentBulkGate().allowed) return;
        const urls = currentOpenTargets();
        if (!urls.length) { syncBulkControl(); return; }
        bulkBusy = true;
        openAllButton.disabled = true;
        showMoreButton.disabled = true;
        bulkMessageKey = '';
        renderBulkStatus();
        try {
          const approved = await confirmBulkOpen({ urls,
            getCurrentTargets: () => currentBulkGate().allowed ? currentOpenTargets() : [],
            getDomainEnabled: () => sitePrefs[currentHost]?.bulkOpenEnabled === true,
            showDialog: showBulkDialog, isSourceAlive: isCurrentBooklist,
            getFilterSignature: currentFilterSignature,
            getCardSnapshot: () => getActiveCards(document),
            onInvalid() { bulkMessageKey = 'auto.bulkChanged'; },
            repeat: hasOpenedOnThisPage });
          if (!approved) {
            renderBulkStatus();
            return;
          }
          const result = await runOpenAll({ urls, openTab: (url, options) => GM_openInTab(url, options),
            isSourceAlive: isCurrentBooklist,
            onProgress(progress) { bulkStatus = progress; renderBulkStatus(); } });
          if (result.attempted > 0) hasOpenedOnThisPage = true;
          bulkStatus = result;
          renderBulkStatus();
        } catch {
          bulkMessageKey = 'auto.showMoreError';
          renderBulkStatus();
        } finally {
          bulkBusy = false;
          if (!disposed) showMoreButton.disabled = false;
          syncBulkControl();
        }
      });
      const downloadRule = panelRoot.querySelector('#zble-download-rule');
      downloadRule.value = settings.downloadRule;
      downloadRule.addEventListener('change', () => {
        settings.downloadRule = downloadRule.value;
        saveSettings(); scheduleRefresh();
      });
      const flushInputs = { format: [], year: [] };
      for (const [selector, key, limit, section] of [
        ['#zble-custom', 'custom', 1000, 'format'], ['#zble-year-min', 'yearMin', 20, 'year'],
        ['#zble-year-max', 'yearMax', 20, 'year'],
      ]) {
        const input = panelRoot.querySelector(selector);
        input.value = settings[key];
        flushInputs[section].push(bindDeferredTextInput(input, value => {
          settings[key] = value.slice(0, limit);
          saveSettings(); scheduleRefresh();
        }));
      }
      const gear = panelRoot.querySelector('#zble-gear');
      const settingsPanel = panelRoot.querySelector('#zble-settings');
      const disclosure = createExclusiveDisclosure(['global', 'format', 'download', 'year'], section => {
        for (const flush of flushInputs[section] || []) flush();
      });
      function renderDisclosure() {
        const current = disclosure.current();
        settingsPanel.hidden = current !== 'global';
        gear.setAttribute('aria-expanded', String(current === 'global'));
        for (const name of ['format', 'download', 'year']) {
          panelRoot.querySelector(`#zble-${name}-config`).hidden = current !== name;
          panelRoot.querySelector(`#zble-configure-${name}`).setAttribute('aria-expanded', String(current === name));
        }
        requestAnimationFrame(applySavedDock);
      }
      const content = panelRoot.querySelector('#zble-content');
      const collapse = panelRoot.querySelector('#zble-collapse');
      const head = panelRoot.querySelector('.head');
      function viewport() { return { width: window.innerWidth, height: window.innerHeight }; }
      function place(left, top) {
        host.style.position = 'fixed';
        host.style.margin = '0';
        host.style.right = 'auto';
        host.style.left = `${left}px`;
        host.style.top = `${top}px`;
      }
      function applySavedDock() {
        if (!settings.panelDock) return;
        const rect = host.getBoundingClientRect();
        const position = clampPanelPosition(settings.panelDock, viewport(), rect);
        place(position.left, position.top);
      }
      function setCollapsed(collapsed) {
        content.hidden = collapsed;
        const action = translate(locale, collapsed ? 'action.expand' : 'action.collapse');
        collapse.setAttribute('aria-label', action);
        collapse.setAttribute('title', action);
        collapse.setAttribute('aria-expanded', String(!collapsed));
        requestAnimationFrame(applySavedDock);
      }
      const headerToggle = createPanelHeaderToggle(() => setCollapsed(!content.hidden));
      head.addEventListener('click', headerToggle.onClick);
      collapse.addEventListener('click', () => setCollapsed(!content.hidden));
      gear.addEventListener('click', () => {
        if (content.hidden) setCollapsed(false);
        disclosure.toggle('global');
        renderDisclosure();
      });
      for (const name of ['format', 'download', 'year']) {
        panelRoot.querySelector(`#zble-configure-${name}`).addEventListener('click', () => {
          if (content.hidden) setCollapsed(false);
          disclosure.toggle(name);
          renderDisclosure();
        });
      }
      panelRoot.querySelector('#zble-reset-position').addEventListener('click', () => {
        resetPanelDock(host, settings, saveSettings);
      });
      let drag = null;
      head.addEventListener('pointerdown', event => {
        headerToggle.onPointerDown();
        if (!canStartPanelDrag(event)) return;
        const rect = host.getBoundingClientRect();
        drag = { x: event.clientX, y: event.clientY, left: rect.left, top: rect.top,
          width: rect.width, height: rect.height, moved: false };
        head.setPointerCapture?.(event.pointerId);
      });
      head.addEventListener('pointermove', event => {
        if (!drag) return;
        const dx = event.clientX - drag.x;
        const dy = event.clientY - drag.y;
        if (!drag.moved && Math.hypot(dx, dy) < 5) return;
        drag.moved = true;
        event.preventDefault();
        const size = viewport();
        place(Math.min(Math.max(0, drag.left + dx), Math.max(0, size.width - drag.width)),
          Math.min(Math.max(0, drag.top + dy), Math.max(0, size.height - drag.height)));
      });
      function finishDrag(event) {
        if (!drag) return;
        headerToggle.onPointerEnd(drag.moved);
        if (drag.moved) {
          const rect = host.getBoundingClientRect();
          const dock = snapPanelPosition(rect, viewport());
          settings.panelDock = { edge: dock.edge, offset: dock.offset };
          saveSettings();
          place(dock.left, dock.top);
        }
        drag = null;
        if (head.hasPointerCapture?.(event.pointerId)) head.releasePointerCapture(event.pointerId);
      }
      head.addEventListener('pointerup', finishDrag);
      head.addEventListener('pointercancel', finishDrag);
      panelResize = createPanelResizeHandler(applySavedDock, scheduleRefresh);
      window.addEventListener('resize', panelResize);
      requestAnimationFrame(applySavedDock);
      refreshPanelLocale();
      scheduleRefresh();
    }

    function init() {
      if (!document.body || disposed) return;
      createPanel();
      startupObserver = new MutationObserver(() => { scheduleRefresh(); if (!isCurrentBooklist()) onStale(); });
      startupObserver.observe(document.documentElement, { childList: true, subtree: true });
      attachObservers();
      scheduleRefresh();
      const library = siteLibrary();
      if (library?._?.downloaded &&
          (Object.keys(library._.downloaded.byId || {}).length || Object.keys(library._.downloaded.byIsbn || {}).length)) {
        onMarksLoaded();
      }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
    else init();

    return { dispose() {
      if (disposed) return;
      disposed = true;
      automationAbort.abort();
      document.removeEventListener?.('DOMContentLoaded', init);
      document.removeEventListener('marksLoaded', onMarksLoaded);
      clearTimeout(timeoutId);
      clearTimeout(retryId);
      startupObserver?.disconnect();
      mainObserver?.disconnect();
      parentObserver?.disconnect();
      for (const observer of classObservers) observer.disconnect();
      if (panelResize) window.removeEventListener?.('resize', panelResize);
      for (const card of initialMain?.querySelectorAll?.('.readlist-view > z-bookcard') || []) {
        card.classList.remove('zble-hidden');
        renderFormatBadge(card, card.getAttribute('extension'), false, locale);
        renderCardMeta(card, { showLanguage: true, showYear: true });
        renderFullTitle(card, false);
        renderFullAuthor(card, false);
      }
      initialMain?.querySelector('.zble-summary-card')?.remove();
      initialMain?.querySelector('.zble-progress')?.remove();
      document.getElementById?.('zble-panel-host')?.remove();
      document.getElementById?.('zble-page-style')?.remove();
      panelRoot = null;
    } };
    }
  }
})();
