// ==UserScript==
// @license      GPL-3.0-or-later
// @name         Z-lib Booklist Enhancer
// @name:zh-CN   Z-Library 书单增强
// @name:zh-TW   Z-Library 書單增強
// @name:fr      Listes de livres Z-Library améliorées
// @name:de      Z-Library: Erweiterte Bücherlisten
// @name:ru      Улучшение списков книг Z-Library
// @name:ja      Z-Library 書籍リスト拡張
// @name:ko      Z-Library 책 목록 개선
// @name:es      Mejora de listas de libros de Z-Library
// @name:pt-BR   Melhorias para listas de livros da Z-Library
// @name:ar      تحسين قوائم كتب Z-Library
// @name:be      Паляпшэнне спісаў кніг Z-Library
// @name:bg      Подобрени списъци с книги в Z-Library
// @name:ckb     باشترکردنی لیستی کتێبەکانی Z-Library
// @name:cs      Vylepšení seznamů knih Z-Library
// @name:da      Forbedrede boglister på Z-Library
// @name:el      Βελτιωμένες λίστες βιβλίων Z-Library
// @name:eo      Plibonigilo por librolistoj de Z-Library
// @name:es-419  Mejoras para listas de libros de Z-Library
// @name:fi      Z-Library-kirjalistojen parannukset
// @name:fil     Pagpapahusay ng mga listahan ng aklat sa Z-Library
// @name:fr-CA   Amélioration des listes de livres Z-Library
// @name:he      שיפור רשימות הספרים של Z-Library
// @name:hr      Poboljšanja popisa knjiga na Z-Libraryju
// @name:hu      Z-Library-könyvlisták fejlesztése
// @name:id      Peningkatan Daftar Buku Z-Library
// @name:it      Liste di libri Z-Library migliorate
// @name:ka      Z-Library-ის წიგნების სიების გაუმჯობესება
// @name:mr      Z-Library पुस्तक यादी सुधारक
// @name:nb      Forbedrede boklister på Z-Library
// @name:nl      Verbeterde boekenlijsten van Z-Library
// @name:pl      Ulepszone listy książek Z-Library
// @name:pt      Melhorias para listas de livros da Z-Library
// @name:ro      Îmbunătățiri pentru listele de cărți Z-Library
// @name:sk      Vylepšenie zoznamov kníh Z-Library
// @name:sr      Побољшања спискова књига Z-Library
// @name:sv      Förbättrade boklistor på Z-Library
// @name:th      ปรับปรุงรายการหนังสือ Z-Library
// @name:tr      Z-Library Kitap Listesi Geliştirici
// @name:ug      Z-Library كىتاب تىزىملىكىنى ياخشىلاش
// @name:uk      Покращення списків книг Z-Library
// @name:vi      Cải thiện danh sách sách Z-Library
// @namespace    local.booklist-enhancer
// @version      4.0.3
// @description      Enhances Z-Library booklists with clearer details, filters and Show more tools. Also filters search results; recommendations and popular books can be filtered by download status.
// @description:zh-CN  增强 Z-Library 书单的信息显示、筛选及 Show more 操作；也可筛选搜索结果，并按下载状态筛选推荐和热门书籍。
// @description:zh-TW  增強 Z-Library 書單的資訊顯示、篩選及 Show more 操作；也可篩選搜尋結果，並依下載狀態篩選推薦與熱門書籍。
// @description:fr     Améliore les listes Z-Library avec des informations plus lisibles, des filtres et des outils Show more. Filtre aussi les résultats de recherche, ainsi que les recommandations et les livres populaires selon leur état de téléchargement.
// @description:de     Verbessert Z-Library-Bücherlisten mit übersichtlicheren Angaben, Filtern und Show more-Werkzeugen. Filtert auch Suchergebnisse sowie Empfehlungen und beliebte Bücher nach Downloadstatus.
// @description:ru     Улучшает списки книг Z-Library: сведения о книгах, фильтры и инструменты Show more. Также фильтрует результаты поиска, а рекомендации и популярные книги — по статусу загрузки.
// @description:ja     Z-Library の書籍リストで情報表示、絞り込み、Show more 操作を改善します。検索結果も絞り込み、推薦・人気の本はダウンロード状態で絞り込めます。
// @description:ko     Z-Library 책 목록의 정보 표시, 필터, Show more 기능을 개선합니다. 검색 결과도 필터링하고 추천·인기 도서는 다운로드 상태로 필터링할 수 있습니다.
// @description:es     Mejora las listas de Z-Library con datos más claros, filtros y herramientas de Show more. También filtra resultados de búsqueda y, por estado de descarga, recomendaciones y libros populares.
// @description:pt-BR  Melhora as listas da Z-Library com informações mais claras, filtros e ferramentas de Show more. Também filtra resultados de busca e, pelo status de download, recomendações e livros populares.
// @description:ar     يعزّز قوائم الكتب في Z-Library ويصفّي نتائج البحث؛ كما يصفّي التوصيات والكتب الشائعة حسب حالة التنزيل.
// @description:be     Паляпшае спісы кніг Z-Library і фільтруе вынікі пошуку; рэкамендацыі і папулярныя кнігі — паводле стану спампоўвання.
// @description:bg     Подобрява списъците с книги в Z-Library и филтрира резултатите от търсенето; филтрира препоръките и популярните книги по състояние на изтегляне.
// @description:ckb    لیستی کتێبەکانی Z-Library باشتر دەکات و ئەنجامەکانی گەڕان پاڵاوتن دەکات؛ پێشنیارەکان و کتێبە باوەکانیش بەپێی دۆخی داگرتن پاڵاوتن دەکات.
// @description:cs     Vylepšuje seznamy knih Z-Library a filtruje výsledky hledání; doporučené a oblíbené knihy filtruje podle stavu stažení.
// @description:da     Forbedrer Z-Librarys boglister og filtrerer søgeresultater; anbefalinger og populære bøger filtreres efter downloadstatus.
// @description:el     Βελτιώνει τις λίστες βιβλίων του Z-Library και φιλτράρει τα αποτελέσματα αναζήτησης· φιλτράρει προτάσεις και δημοφιλή βιβλία με βάση την κατάσταση λήψης.
// @description:eo     Plibonigas la librolistojn de Z-Library kaj filtras serĉrezultojn; filtras rekomendojn kaj popularajn librojn laŭ elŝuta stato.
// @description:es-419 Mejora las listas de Z-Library y filtra resultados de búsqueda; filtra recomendaciones y libros populares según su estado de descarga.
// @description:fi     Parantaa Z-Libraryn kirjalistoja ja suodattaa hakutuloksia; suodattaa suosituksia ja suosittuja kirjoja lataustilan perusteella.
// @description:fil    Pinapahusay ang mga listahan ng aklat sa Z-Library at sinasala ang mga resulta ng paghahanap; sinasala rin ang mga rekomendasyon at sikat na aklat ayon sa katayuan ng pag-download.
// @description:fr-CA  Améliore les listes de livres Z-Library et filtre les résultats de recherche; filtre les recommandations et les livres populaires selon leur état de téléchargement.
// @description:he     משפר רשימות ספרים ב-Z-Library ומסנן תוצאות חיפוש; מסנן המלצות וספרים פופולריים לפי מצב ההורדה.
// @description:hr     Poboljšava popise knjiga na Z-Libraryju i filtrira rezultate pretraživanja; preporuke i popularne knjige filtrira prema statusu preuzimanja.
// @description:hu     Javítja a Z-Library könyvlistáit és szűri a keresési találatokat; az ajánlott és népszerű könyveket letöltési állapot szerint szűri.
// @description:id     Meningkatkan daftar buku Z-Library dan memfilter hasil pencarian; rekomendasi dan buku populer dapat difilter menurut status unduhan.
// @description:it     Migliora le liste di libri di Z-Library e filtra i risultati di ricerca; filtra consigli e libri popolari in base allo stato di download.
// @description:ka     აუმჯობესებს Z-Library-ის წიგნების სიებს და ფილტრავს ძიების შედეგებს; რეკომენდაციებსა და პოპულარულ წიგნებს ჩამოტვირთვის სტატუსით ფილტრავს.
// @description:mr     Z-Library च्या पुस्तक याद्या सुधारते आणि शोध परिणाम फिल्टर करते; शिफारस केलेली व लोकप्रिय पुस्तके डाउनलोड स्थितीनुसार फिल्टर करते.
// @description:nb     Forbedrer Z-Librarys boklister og filtrerer søkeresultater; anbefalte og populære bøker filtreres etter nedlastingsstatus.
// @description:nl     Verbetert de boekenlijsten van Z-Library en filtert zoekresultaten; filtert aanbevelingen en populaire boeken op downloadstatus.
// @description:pl     Ulepsza listy książek Z-Library i filtruje wyniki wyszukiwania; rekomendacje i popularne książki filtruje według stanu pobrania.
// @description:pt     Melhora as listas de livros da Z-Library e filtra resultados de pesquisa; filtra recomendações e livros populares pelo estado de descarregamento.
// @description:ro     Îmbunătățește listele de cărți Z-Library și filtrează rezultatele căutării; filtrează recomandările și cărțile populare după starea descărcării.
// @description:sk     Vylepšuje zoznamy kníh Z-Library a filtruje výsledky vyhľadávania; odporúčané a obľúbené knihy filtruje podľa stavu stiahnutia.
// @description:sr     Побољшава спискове књига на Z-Library и филтрира резултате претраге; препоруке и популарне књиге филтрира према статусу преузимања.
// @description:sv     Förbättrar Z-Librarys boklistor och filtrerar sökresultat; rekommendationer och populära böcker filtreras efter nedladdningsstatus.
// @description:th     ปรับปรุงรายการหนังสือของ Z-Library และกรองผลการค้นหา รวมถึงกรองหนังสือแนะนำและหนังสือยอดนิยมตามสถานะการดาวน์โหลด
// @description:tr     Z-Library kitap listelerini geliştirir ve arama sonuçlarını filtreler; önerilen ve popüler kitapları indirme durumuna göre filtreler.
// @description:ug     Z-Library كىتاب تىزىملىكلىرىنى ياخشىلايدۇ ۋە ئىزدەش نەتىجىلىرىنى سۈزەلەيدۇ؛ تەۋسىيە قىلىنغان ۋە ئالقىشلىق كىتابلارنى چۈشۈرۈش ھالىتى بويىچە سۈزەلەيدۇ.
// @description:uk     Покращує списки книг Z-Library і фільтрує результати пошуку; рекомендації та популярні книги фільтрує за станом завантаження.
// @description:vi     Cải thiện danh sách sách trên Z-Library và lọc kết quả tìm kiếm; lọc sách được đề xuất và sách phổ biến theo trạng thái tải xuống.
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
  const MASONRY_PAGE_KINDS = new Set(['home-recommend', 'detail-recommend', 'popular']);
  const PAGE_SIZE = 20;
  const SETTING_FORMATS = new Set([...KNOWN_FORMATS, 'other', 'custom']);
  const SIZE_BANDS = new Set(['lt1', '1to10', '10to50', '50to100', 'gte100', 'unknown']);
  const DEFAULT_SETTINGS = Object.freeze({
    showFormat: true,
    showSize: false,
    showProgress: true,
    showSummary: true,
    filterFormat: false,
    filterSize: false,
    filterDownload: false,
    formats: [],
    sizeBands: [],
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
    showMoreCount1: 5,
    showMoreCount2: 10,
  });

  const LOCALES = ['en', 'zh-CN', 'zh-TW', 'fr', 'de', 'ru', 'ja', 'ko', 'es', 'pt-BR'];
  // Entries are ordered as LOCALES. Keep one complete row per tool-owned message.
  const MESSAGES = {
    'section.filters': ['Filters', '筛选器', '篩選器', 'Filtres', 'Filter', 'Фильтры', 'フィルター', '필터', 'Filtros', 'Filtros'],
    'section.info': ['Display options', '信息显示', '資訊顯示', 'Options d’affichage', 'Anzeigeoptionen', 'Настройки отображения', '表示設定', '표시 설정', 'Opciones de visualización', 'Opções de exibição'],
    'section.automation': ['Automation (beta)', '自动化（beta）', '自動化（beta）', 'Automatisation (bêta)', 'Automatisierung (Beta)', 'Автоматизация (бета)', '自動化（ベータ）', '자동화(베타)', 'Automatización (beta)', 'Automação (beta)'],
    'section.automationConfig': ['Automation settings', '自动化设置', '自動化設定', 'Réglages de l’automatisation', 'Automatisierungseinstellungen', 'Настройки автоматизации', '自動操作の設定', '자동화 설정', 'Configuración de automatización', 'Configurações da automação'],
    'section.settings': ['Settings', '设置', '設定', 'Paramètres', 'Einstellungen', 'Настройки', '設定', '설정', 'Configuración', 'Configurações'],
    'section.configuration': ['Filter settings', '筛选配置', '篩選配置', 'Paramètres du filtre', 'Filtereinstellungen', 'Настройки фильтра', 'フィルター設定', '필터 설정', 'Ajustes del filtro', 'Configurações do filtro'],
    'hint.siteMissing': ['Site does not provide this information', '站点未提供该信息', '網站未提供此資訊', 'Le site ne fournit pas cette information', 'Die Website stellt diese Information nicht bereit', 'Сайт не предоставляет эти сведения', 'サイトからこの情報は提供されていません', '사이트에서 이 정보를 제공하지 않습니다', 'El sitio no proporciona esta información', 'O site não fornece esta informação'],
    'hint.booklistOnly': ['Only available on booklist pages', '仅书单页面可用', '僅書單頁面可用', 'Disponible uniquement sur les pages de listes de livres', 'Nur auf Bücherlistenseiten verfügbar', 'Доступно только на страницах списков книг', '書籍リストのページでのみ利用できます', '책 목록 페이지에서만 사용할 수 있습니다', 'Solo disponible en páginas de listas de libros', 'Disponível apenas em páginas de listas de livros'],
    'section.about': ['About', '关于', '關於', 'À propos', 'Über', 'О проекте', 'このツールについて', '정보', 'Acerca de', 'Sobre'],
    'about.description': ['Enhance booklists and filter search results; filter recommendations and popular books by download status.', '增强书单并筛选搜索结果；推荐和热门书籍可按下载状态筛选。', '增強書單並篩選搜尋結果；推薦與熱門書籍可依下載狀態篩選。', 'Améliorez les listes de livres et filtrez les résultats de recherche; filtrez les recommandations et les livres populaires selon leur état de téléchargement.', 'Bücherlisten verbessern und Suchergebnisse filtern; Empfehlungen und beliebte Bücher nach Downloadstatus filtern.', 'Улучшайте списки книг и фильтруйте результаты поиска; рекомендации и популярные книги фильтруйте по статусу загрузки.', '書籍リストを便利にし、検索結果を絞り込めます。推薦・人気の本はダウンロード状態で絞り込めます。', '책 목록을 개선하고 검색 결과를 필터링합니다. 추천·인기 도서는 다운로드 상태로 필터링할 수 있습니다.', 'Mejora las listas de libros y filtra los resultados de búsqueda; filtra recomendaciones y libros populares por estado de descarga.', 'Melhore as listas de livros e filtre resultados de busca; filtre recomendações e livros populares pelo status de download.'],
    'about.developer': ['Developer', '开发者', '開發者', 'Développeur', 'Entwickler', 'Разработчик', '開発者', '개발자', 'Desarrollador', 'Desenvolvedor'],
    'about.github': ['GitHub page', 'GitHub 页面', 'GitHub 頁面', 'Page GitHub', 'GitHub-Seite', 'Страница GitHub', 'GitHub ページ', 'GitHub 페이지', 'Página de GitHub', 'Página no GitHub'],
    'about.placeholder': ['Not provided', '未提供', '未提供', 'Non renseigné', 'Nicht angegeben', 'Не указано', '未掲載', '제공되지 않음', 'No disponible', 'Não informado'],
    'control.formatBadge': ['File format badge', '文件格式标签', '檔案格式標籤', 'Étiquette du format', 'Dateiformat-Label', 'Метка формата файла', 'ファイル形式のラベル', '파일 형식 배지', 'Etiqueta de formato', 'Etiqueta do formato'],
    'control.sizeBadge': ['File size badge', '文件大小标签', '檔案大小標籤', 'Étiquette de taille du fichier', 'Dateigrößenetikett', 'Метка размера файла', 'ファイルサイズのラベル', '파일 크기 배지', 'Etiqueta del tamaño del archivo', 'Etiqueta do tamanho do arquivo'],
    'control.showProgress': ['Show estimated page progress near Show more', 'Show more 按钮显示页码', 'Show more 按鈕顯示頁碼', 'Afficher la progression estimée près de Show more', 'Geschätzten Seitenfortschritt bei Show more anzeigen', 'Показывать примерный прогресс по страницам рядом с Show more', 'Show more の近くに推定ページ進捗を表示', 'Show more 근처에 예상 페이지 진행 상황 표시', 'Mostrar el progreso estimado junto a Show more', 'Mostrar o progresso estimado perto de Show more'],
    'control.showSummary': ['Summary card at end of list', '列表末尾统计卡片', '清單末尾統計卡片', 'Carte récapitulative en fin de liste', 'Statistikkarte am Listenende', 'Карточка статистики в конце списка', 'リスト末尾に集計カードを表示', '목록 끝에 요약 카드 표시', 'Tarjeta de resumen al final de la lista', 'Cartão de resumo no fim da lista'],
    'control.language': ['Book language (from site)', '书籍语言（页面自带）', '書籍語言（頁面自帶）', 'Langue du livre (site)', 'Buchsprache (von der Seite)', 'Язык книги (на странице)', '書籍の言語（サイト表示）', '책 언어(사이트 제공)', 'Idioma del libro (del sitio)', 'Idioma do livro (do site)'],
    'control.year': ['Publication year (from site)', '出版年份（页面自带）', '出版年份（頁面自帶）', 'Année de publication (site)', 'Erscheinungsjahr (von der Seite)', 'Год издания (на странице)', '出版年（サイト表示）', '출판 연도(사이트 제공)', 'Año de publicación (del sitio)', 'Ano de publicação (do site)'],
    'control.fullTitle': ['Show full book titles', '完整显示超长书名', '完整顯示過長書名', 'Afficher les titres longs en entier', 'Lange Titel vollständig anzeigen', 'Показывать длинные названия полностью', '長い書名を省略せず表示', '긴 책 제목 전체 표시', 'Mostrar los títulos completos', 'Mostrar os títulos completos'],
    'control.fullAuthor': ['Show full author names', '完整显示超长作者名', '完整顯示過長作者名稱', 'Afficher les noms d’auteur longs en entier', 'Lange Autorennamen vollständig anzeigen', 'Показывать длинные имена авторов полностью', '長い著者名を省略せず表示', '긴 저자 이름 전체 표시', 'Mostrar los nombres completos de los autores', 'Mostrar os nomes completos dos autores'],
    'control.filterFormat': ['Show only selected file formats', '只显示指定文件格式', '只顯示指定檔案格式', 'Afficher uniquement les formats choisis', 'Nur ausgewählte Dateiformate', 'Только выбранные форматы', '選択したファイル形式だけを表示', '선택한 파일 형식만 표시', 'Mostrar solo los formatos de archivo seleccionados', 'Mostrar apenas os formatos de arquivo selecionados'],
    'control.filterSize': ['Show only selected file sizes', '只显示指定文件大小', '只顯示指定檔案大小', 'Afficher seulement les tailles de fichier choisies', 'Nur ausgewählte Dateigrößen anzeigen', 'Показывать только выбранные размеры файлов', '選択したファイルサイズだけを表示', '선택한 파일 크기만 표시', 'Mostrar solo los tamaños de archivo seleccionados', 'Mostrar apenas os tamanhos de arquivo selecionados'],
    'control.filterDownload': ['Filter by download status', '只显示指定下载状态', '只顯示指定下載狀態', 'Filtrer selon l’état de téléchargement', 'Nach Downloadstatus filtern', 'Фильтровать по статусу скачивания', 'ダウンロード状態で絞り込む', '다운로드 상태로 필터링', 'Filtrar por estado de descarga', 'Filtrar por status de download'],
    'control.filterYear': ['Filter by publication year', '只显示指定年份的书籍', '只顯示指定年份的書籍', 'Filtrer par année de publication', 'Nach Erscheinungsjahr filtern', 'Фильтровать по году издания', '出版年で絞り込む', '출판 연도로 필터링', 'Filtrar por año de publicación', 'Filtrar por ano de publicação'],
    'setting.formats': ['File formats (select all that apply)', '筛选文件格式（可多选）', '篩選檔案格式（可多選）', 'Formats de fichier (plusieurs choix possibles)', 'Dateiformate (Mehrfachauswahl möglich)', 'Форматы файлов (можно выбрать несколько)', 'ファイル形式（複数選択可）', '파일 형식(여러 개 선택 가능)', 'Formatos de archivo (selección múltiple)', 'Formatos de arquivo (seleção múltipla)'],
    'setting.sizeBands': ['File size ranges (select all that apply)', '文件大小范围（可多选）', '檔案大小範圍（可多選）', 'Plages de taille (plusieurs choix possibles)', 'Dateigrößenbereiche (Mehrfachauswahl möglich)', 'Диапазоны размера файла (можно выбрать несколько)', 'ファイルサイズの範囲（複数選択可）', '파일 크기 범위(여러 개 선택 가능)', 'Rangos de tamaño de archivo (selección múltiple)', 'Faixas de tamanho de arquivo (seleção múltipla)'],
    'setting.size.lt1': ['Under 1 MB', '小于 1 MB', '小於 1 MB', 'Moins de 1 Mo', 'Unter 1 MB', 'Менее 1 МБ', '1 MB 未満', '1 MB 미만', 'Menos de 1 MB', 'Menos de 1 MB'],
    'setting.size.1to10': ['1–10 MB', '1–10 MB', '1–10 MB', '1–10 Mo', '1–10 MB', '1–10 МБ', '1～10 MB', '1–10 MB', '1–10 MB', '1–10 MB'],
    'setting.size.10to50': ['10–50 MB', '10–50 MB', '10–50 MB', '10–50 Mo', '10–50 MB', '10–50 МБ', '10～50 MB', '10–50 MB', '10–50 MB', '10–50 MB'],
    'setting.size.50to100': ['50–100 MB', '50–100 MB', '50–100 MB', '50–100 Mo', '50–100 MB', '50–100 МБ', '50～100 MB', '50–100 MB', '50–100 MB', '50–100 MB'],
    'setting.size.gte100': ['100 MB or more', '100 MB 及以上', '100 MB 及以上', '100 Mo ou plus', 'Ab 100 MB', '100 МБ и более', '100 MB 以上', '100 MB 이상', '100 MB o más', '100 MB ou mais'],
    'setting.size.unknown': ['Unknown size', '未知大小', '未知大小', 'Taille inconnue', 'Unbekannte Größe', 'Размер неизвестен', 'サイズ不明', '크기 알 수 없음', 'Tamaño desconocido', 'Tamanho desconhecido'],
    'setting.other': ['All others', '其他全部', '其他全部', 'Autres formats', 'Andere Formate', 'Другие форматы', 'その他の形式すべて', '기타 모든 형식', 'Otros formatos', 'Outros formatos'],
    'setting.custom': ['Custom', '自定义', '自訂', 'Personnalisé', 'Benutzerdefiniert', 'Свой вариант', 'カスタム', '사용자 지정', 'Personalizado', 'Personalizado'],
    'setting.customPlaceholder': ['e.g., djvu, txt; fb2', '如 djvu, txt; fb2', '例如 djvu, txt; fb2', 'ex. djvu, txt; fb2', 'z. B. djvu, txt; fb2', 'например djvu, txt; fb2', '例: djvu, txt; fb2', '예: djvu, txt; fb2', 'p. ej. djvu, txt; fb2', 'ex.: djvu, txt; fb2'],
    'setting.customHint': ['Separate formats with commas or semicolons.', '用逗号或分号分隔格式。', '以逗號或分號分隔格式。', 'Séparez les formats par des virgules ou des points-virgules.', 'Formate durch Kommas oder Semikolons trennen.', 'Разделяйте форматы запятыми или точками с запятой.', '形式をカンマまたはセミコロンで区切って入力してください。', '형식을 쉼표나 세미콜론으로 구분해 입력하세요.', 'Separa los formatos con comas o punto y coma.', 'Separe os formatos com vírgulas ou ponto e vírgula.'],
    'setting.downloadRule': ['Download status', '下载状态规则', '下載狀態規則', 'État de téléchargement à afficher', 'Downloadstatus', 'Статус скачивания', 'ダウンロード状態', '다운로드 상태', 'Estado de descarga', 'Status de download'],
    'setting.onlyUndownloaded': ['Not downloaded', '仅未下载', '僅未下載', 'Non téléchargés', 'Nicht heruntergeladen', 'Не скачано', '未ダウンロード', '다운로드하지 않은 책', 'No descargados', 'Não baixados'],
    'setting.onlyDownloaded': ['Downloaded', '仅已下载', '僅已下載', 'Téléchargés', 'Heruntergeladen', 'Скачано', 'ダウンロード済み', '다운로드한 책', 'Descargados', 'Baixados'],
    'setting.yearRange': ['Publication year range (inclusive)', '出版年份范围（含端点）', '出版年份範圍（含端點）', 'Années de publication (bornes incluses)', 'Erscheinungsjahre (einschließlich Grenzen)', 'Годы издания (границы включены)', '出版年の範囲（開始年・終了年を含む）', '출판 연도 범위(시작·끝 연도 포함)', 'Años de publicación (límites incluidos)', 'Anos de publicação (limites incluídos)'],
    'setting.showMoreCount1': ['Show more clicks (first button)', '连点器 1 次数', '連點器 1 次數', 'Clics sur Show more (premier bouton)', 'Show-more-Klicks (erste Schaltfläche)', 'Нажатия Show more (первая кнопка)', 'Show more のクリック回数（1つ目のボタン）', 'Show more 클릭 횟수(첫 번째 버튼)', 'Clics en Show more (primer botón)', 'Cliques em Show more (primeiro botão)'],
    'setting.showMoreCount2': ['Show more clicks (second button)', '连点器 2 次数', '連點器 2 次數', 'Clics sur Show more (deuxième bouton)', 'Show-more-Klicks (zweite Schaltfläche)', 'Нажатия Show more (вторая кнопка)', 'Show more のクリック回数（2つ目のボタン）', 'Show more 클릭 횟수(두 번째 버튼)', 'Clics en Show more (segundo botón)', 'Cliques em Show more (segundo botão)'],
    'setting.continuousEnabled': ['Enable continuous clicking on this site', '在本站启用持续连点', '在本站啟用持續連點', 'Activer les clics continus sur ce site', 'Fortlaufendes Klicken auf dieser Website aktivieren', 'Включить непрерывные нажатия на этом сайте', 'このサイトで Show more の連続クリックを有効にする', '이 사이트에서 Show more 연속 클릭 사용', 'Activar los clics continuos en este sitio', 'Ativar cliques contínuos neste site'],
    'setting.minYear': ['Start year', '起始年份', '起始年份', 'Année de début', 'Anfangsjahr', 'Начальный год', '開始年', '시작 연도', 'Año inicial', 'Ano inicial'],
    'setting.maxYear': ['End year', '截止年份', '截止年份', 'Année de fin', 'Endjahr', 'Конечный год', '終了年', '종료 연도', 'Año final', 'Ano final'],
    'setting.yearPlaceholder': ['Leave blank for no limit', '留空不限', '留空不限', 'Laisser vide pour ne pas limiter', 'Leer lassen für keine Begrenzung', 'Оставьте пустым, чтобы не ограничивать', '空欄なら制限なし', '비워 두면 제한 없음', 'Déjalo en blanco para no limitar', 'Deixe em branco para não limitar'],
    'setting.yearHint': ['Applies when you pause typing or press Enter. Either field may be blank.', '停顿后或按回车生效；可只填一端。', '停頓後或按 Enter 生效；可只填一端。', 'La modification s’applique après une pause dans la saisie ou avec Entrée. Vous pouvez laisser un champ vide.', 'Die Änderung wird nach einer Eingabepause oder mit Enter übernommen. Ein Feld kann leer bleiben.', 'Изменение применяется после паузы при вводе или нажатия Enter. Одно поле можно оставить пустым.', '入力を止めて少し待つか、Enter キーを押すと反映されます。片方は空欄でもかまいません。', '입력을 멈추고 잠시 기다리거나 Enter를 누르면 적용됩니다. 한쪽 칸은 비워 두어도 됩니다.', 'El cambio se aplica al dejar de escribir o pulsar Intro. Puedes dejar uno de los campos en blanco.', 'A alteração é aplicada quando você para de digitar ou pressiona Enter. Um dos campos pode ficar vazio.'],
    'setting.missingYear': ['Include books without a year', '显示年份缺失的书籍', '顯示缺少年份的書籍', 'Inclure les livres sans année', 'Bücher ohne Jahr einschließen', 'Включать книги без года', '出版年がない本も表示', '출판 연도가 없는 책도 표시', 'Incluir libros sin año', 'Incluir livros sem ano'],
    'setting.resetPosition': ['Reset panel position', '重置浮窗位置', '重設浮窗位置', 'Réinitialiser la position', 'Panelposition zurücksetzen', 'Сбросить положение панели', 'パネル位置をリセット', '패널 위치 초기화', 'Restablecer posición', 'Redefinir posição'],
    'setting.userMatches': ['Other mirrors: add User matches in Tampermonkey.', '其他镜像：请在 Tampermonkey 中添加 User matches。', '其他鏡像：請在 Tampermonkey 中加入 User matches。', 'Autres miroirs : ajoutez des User matches dans Tampermonkey.', 'Weitere Mirrors: User matches in Tampermonkey hinzufügen.', 'Другие зеркала: добавьте User matches в Tampermonkey.', '他のミラーは Tampermonkey の User matches に追加してください。', '다른 미러는 Tampermonkey의 User matches에 추가하세요.', 'Otros sitios espejo: añade User matches en Tampermonkey.', 'Outros espelhos: adicione User matches no Tampermonkey.'],
    'setting.language': ['Interface language', '界面语言', '介面語言', 'Langue de l’interface', 'Oberflächensprache', 'Язык интерфейса', '表示言語', '인터페이스 언어', 'Idioma de la interfaz', 'Idioma da interface'],
    'setting.autoLanguage': ['Use browser or system language', '跟随浏览器/系统', '跟隨瀏覽器／系統', 'Utiliser la langue du navigateur ou du système', 'Browser- oder Systemsprache verwenden', 'Использовать язык браузера или системы', 'ブラウザーまたはシステムの言語を使用', '브라우저 또는 시스템 언어 사용', 'Usar el idioma del navegador o del sistema', 'Usar o idioma do navegador ou do sistema'],
    'setting.showNotice': ['Show welcome notice on this site', '在本站显示启动提示', '在本站顯示啟用提示', 'Afficher le message d’accueil sur ce site', 'Willkommenshinweis auf dieser Website anzeigen', 'Показывать приветственное уведомление на этом сайте', 'このサイトで案内を表示', '이 사이트에서 시작 안내 표시', 'Mostrar aviso de bienvenida en este sitio', 'Mostrar aviso de boas-vindas neste site'],
    'setting.allowBulk': ['Enable bulk opening on this site', '在本站启用批量打开', '在本站啟用批次開啟', 'Activer l’ouverture groupée sur ce site', 'Öffnen mehrerer Buchseiten auf dieser Website aktivieren', 'Разрешить открытие нескольких страниц книг на этом сайте', 'このサイトで書籍ページをまとめて開く機能を有効にする', '이 사이트에서 책 페이지 한꺼번에 열기 사용', 'Activar apertura masiva en este sitio', 'Ativar abertura de várias páginas neste site'],
    'notice.message': ['Booklist tools are ready. Filters also work on search results, recommendations, and popular books.', '书单工具已就绪；搜索结果、推荐和热门书籍也可筛选。', '書單工具已就緒；搜尋結果、推薦與熱門書籍也可篩選。', 'Les outils pour les listes de livres sont prêts. Les filtres fonctionnent aussi sur les résultats de recherche, les recommandations et les livres populaires.', 'Die Bücherlisten-Werkzeuge sind bereit. Filter funktionieren auch bei Suchergebnissen, Empfehlungen und beliebten Büchern.', 'Инструменты для списков книг готовы. Фильтры также работают в результатах поиска, рекомендациях и списках популярных книг.', '書籍リスト用のツールを使えます。検索結果や推薦・人気の本も絞り込めます。', '책 목록 도구를 사용할 수 있습니다. 검색 결과와 추천·인기 도서에도 필터를 적용할 수 있습니다.', 'Las herramientas para listas están listas. Los filtros también funcionan en resultados de búsqueda, recomendaciones y libros populares.', 'As ferramentas para listas estão prontas. Os filtros também funcionam nos resultados de busca, nas recomendações e nos livros populares.'],
    'notice.link': ['Browse booklists', '浏览书单', '瀏覽書單', 'Parcourir les listes', 'Bücherlisten ansehen', 'Открыть списки книг', '書籍リストを見る', '책 목록 보기', 'Ver listas de libros', 'Ver listas de livros'],
    'notice.listPage': ['Open a booklist to use these tools.', '打开任意书单即可启用工具。', '開啟任意書單即可啟用工具。', 'Ouvrez une liste de livres pour utiliser les outils.', 'Öffnen Sie eine Bücherliste, um die Werkzeuge zu nutzen.', 'Откройте любой список книг, чтобы использовать инструмент.', '書籍リストを開くと、このツールを使えます。', '책 목록을 열면 이 도구를 사용할 수 있습니다.', 'Abre una lista de libros para usar estas herramientas.', 'Abra uma lista de livros para usar estas ferramentas.'],
    'notice.close': ['Close · {seconds}s', '关闭 · {seconds}秒', '關閉 · {seconds}秒', 'Fermer · {seconds}s', 'Schließen · {seconds}s', 'Закрыть · {seconds}с', '閉じる · {seconds}秒', '닫기 · {seconds}초', 'Cerrar · {seconds}s', 'Fechar · {seconds}s'],
    'notice.optout': ['Do not show this again', '不再显示该提示', '不再顯示此提示', 'Ne plus afficher cet avis', 'Diesen Hinweis nicht mehr anzeigen', 'Больше не показывать', '今後表示しない', '다시 표시하지 않기', 'No volver a mostrar', 'Não mostrar novamente'],
    'summary.loaded': ['Books loaded', '当前已加载', '目前已載入', 'Livres chargés', 'Geladene Bücher', 'Загружено книг', '読み込み済みの本', '불러온 책', 'Libros cargados', 'Livros carregados'],
    'summary.matched': ['Books shown after filtering', '本工具筛选后', '本工具篩選後', 'Livres affichés après filtrage', 'Bücher nach dem Filtern', 'Показано книг после фильтрации', '絞り込み後に表示する本', '필터링 후 표시되는 책', 'Libros visibles tras filtrar', 'Livros exibidos após o filtro'],
    'summary.total': ['Booklist total', '书单共', '書單共', 'Total de la liste', 'Bücher insgesamt', 'Всего в списке', '書籍リストの合計', '책 목록 전체', 'Total de la lista', 'Total da lista'],
    'summary.unknown': ['Unknown', '未知', '未知', 'Inconnu', 'Unbekannt', 'Неизвестно', '不明', '알 수 없음', 'Desconocido', 'Desconhecido'],
    'progress.empty': ['No books loaded yet', '尚无已加载书籍', '尚無已載入書籍', 'Aucun livre chargé', 'Noch keine Bücher geladen', 'Книги ещё не загружены', 'まだ本を読み込んでいません', '아직 불러온 책 없음', 'Aún no hay libros cargados', 'Nenhum livro carregado'],
    'progress.text': ['Estimated Show more clicks: {expansions}; page {current} of {pages}; pages remaining: {remaining} (20 books per page)', '已点 {expansions} 次，当前第 {current} 页，共 {pages} 页，剩余 {remaining} 页 （按每页 20 本估算）', '已點 {expansions} 次，目前第 {current} 頁，共 {pages} 頁，剩餘 {remaining} 頁 （按每頁 20 本估算）', 'Clics estimés sur Show more : {expansions} ; page {current} sur {pages} ; pages restantes : {remaining} (20 livres par page)', 'Geschätzte Show-more-Klicks: {expansions}; Seite {current} von {pages}; verbleibende Seiten: {remaining} (20 Bücher pro Seite)', 'Примерное число нажатий Show more: {expansions}; страница {current} из {pages}; осталось страниц: {remaining} (по 20 книг на страницу)', 'Show more の推定クリック回数：{expansions}回、現在 {current}/{pages}ページ、残り{remaining}ページ（1ページ20冊で推定）', 'Show more 예상 클릭 횟수: {expansions}회, 현재 {current}/{pages}페이지, 남은 페이지: {remaining}(페이지당 20권 기준)', 'Clics estimados en Show more: {expansions}; página {current} de {pages}; páginas restantes: {remaining} (20 libros por página)', 'Cliques estimados em Show more: {expansions}; página {current} de {pages}; páginas restantes: {remaining} (20 livros por página)'],
    'progress.zero': ['No books loaded; estimated total pages: {pages}; remaining: {remaining}', '尚无已加载书籍，尚未加载约 {remaining} 页，书单总长度约 {pages} 页', '尚無已載入書籍，尚未載入約 {remaining} 頁，書單總長約 {pages} 頁', 'Aucun livre chargé ; nombre estimé de pages : {pages} ; pages restantes : {remaining}', 'Noch keine Bücher geladen; geschätzte Seitenzahl: {pages}; verbleibend: {remaining}', 'Книги ещё не загружены; примерное число страниц: {pages}; осталось: {remaining}', 'まだ本を読み込んでいません。推定総ページ数：{pages}ページ、残り：{remaining}ページ', '아직 불러온 책 없음. 예상 전체 페이지: {pages}, 남은 페이지: {remaining}', 'Aún no hay libros cargados; páginas estimadas: {pages}; restantes: {remaining}', 'Nenhum livro carregado; total estimado de páginas: {pages}; restantes: {remaining}'],
    'progress.unknown': ['Estimated Show more clicks: {expansions}; page {current}; total pages unknown (20 books per page)', '已点 {expansions} 次，当前第 {current} 页，总页数未知（按每页 20 本估算）', '已點 {expansions} 次，目前第 {current} 頁，總頁數未知（按每頁 20 本估算）', 'Clics estimés sur Show more : {expansions} ; page {current} ; total inconnu (20 livres par page)', 'Geschätzte Show-more-Klicks: {expansions}; Seite {current}; Gesamtzahl unbekannt (20 Bücher pro Seite)', 'Примерное число нажатий Show more: {expansions}; страница {current}; общее число страниц неизвестно (по 20 книг на страницу)', 'Show more の推定クリック回数：{expansions}回、現在{current}ページ、総ページ数は不明（1ページ20冊で推定）', 'Show more 예상 클릭 횟수: {expansions}회, 현재 {current}페이지, 전체 페이지 수 알 수 없음(페이지당 20권 기준)', 'Clics estimados en Show more: {expansions}; página {current}; total desconocido (20 libros por página)', 'Cliques estimados em Show more: {expansions}; página {current}; total desconhecido (20 livros por página)'],
    'progress.zeroUnknown': ['No books loaded; total pages unknown', '尚无已加载书籍；书单总页数未知', '尚無已載入書籍；書單總頁數未知', 'Aucun livre chargé ; nombre total de pages inconnu', 'Noch keine Bücher geladen; Gesamtzahl der Seiten unbekannt', 'Книги ещё не загружены; всего страниц неизвестно', 'まだ本を読み込んでいません。総ページ数は不明', '아직 불러온 책 없음. 전체 페이지 수 알 수 없음', 'Aún no hay libros cargados; total de páginas desconocido', 'Nenhum livro carregado; total de páginas desconhecido'],
    'auto.showMore': ['Click Show more {count} times', '连点 {count} 次 Show more', '連點 {count} 次 Show more', 'Cliquer {count} fois sur Show more', 'Show more {count}-mal anklicken', 'Нажать Show more {count} раз', 'Show more を {count} 回クリック', 'Show more를 {count}번 클릭', 'Pulsar Show more {count} veces', 'Clicar em Show more {count} vezes'],
    'auto.showMoreOne': ['Click Show more once', '连点 1 次 Show more', '連點 1 次 Show more', 'Cliquer une fois sur Show more', 'Show more 1-mal anklicken', 'Нажать Show more 1 раз', 'Show more を 1 回クリック', 'Show more를 1번 클릭', 'Pulsar Show more 1 vez', 'Clicar em Show more 1 vez'],
    'auto.continuous': ['Keep clicking Show more until the whole booklist is displayed', '持续连点 Show more，直到书单显示完毕', '持續連點 Show more，直到書單顯示完畢', 'Cliquer sur Show more jusqu’à afficher toute la liste de livres', 'Show more anklicken, bis die gesamte Bücherliste angezeigt wird', 'Нажимать Show more, пока не отобразится весь список книг', '書籍リスト全体が表示されるまで Show more を繰り返しクリック', '전체 도서 목록이 표시될 때까지 Show more 계속 클릭', 'Pulsar Show more hasta que se muestre toda la lista de libros', 'Clicar em Show more até que toda a lista de livros seja exibida'],
    'auto.showMoreProgress': ['Attempts: {clicked}; remaining: {remaining}', '已点 {clicked} 次，剩余 {remaining} 次', '已點 {clicked} 次，剩餘 {remaining} 次', 'Tentatives : {clicked} ; restantes : {remaining}', 'Versuche: {clicked}; verbleibend: {remaining}', 'Попыток: {clicked}; осталось: {remaining}', '試行：{clicked}回、残り：{remaining}回', '시도: {clicked}회, 남음: {remaining}회', 'Intentos: {clicked}; restantes: {remaining}', 'Tentativas: {clicked}; restantes: {remaining}'],
    'auto.continuousProgress': ['Attempts: {clicked}', '已点 {clicked} 次', '已點 {clicked} 次', 'Tentatives : {clicked}', 'Versuche: {clicked}', 'Попыток: {clicked}', '試行：{clicked}回', '시도: {clicked}회', 'Intentos: {clicked}', 'Tentativas: {clicked}'],
    'auto.countInvalid': ['Enter a whole number from 1 to 50. Using the default: {default} clicks.', '请输入 1–50 的整数；当前使用默认 {default} 次。', '請輸入 1–50 的整數；目前使用預設的 {default} 次。', 'Saisissez un entier de 1 à 50 ; la valeur par défaut de {default} clics est utilisée.', 'Ganze Zahl von 1 bis 50 eingeben; derzeit gelten die voreingestellten {default} Klicks.', 'Введите целое число от 1 до 50; пока используется значение по умолчанию: {default}.', '1～50 の整数を入力してください。現在は既定の {default} 回で実行します。', '1~50의 정수를 입력하세요. 현재 기본값 {default}회로 실행합니다.', 'Introduce un número entero del 1 al 50; se usa el valor predeterminado de {default} clics.', 'Digite um número inteiro de 1 a 50; o padrão de {default} cliques está em uso.'],
    'auto.continuousDisabled': ['Enable continuous clicking for this site in Automation settings.', '请先在自动化设置中启用本站持续连点。', '請先在自動化設定中啟用本站持續連點。', 'Activez les clics continus pour ce site dans les réglages de l’automatisation.', 'Fortlaufendes Klicken für diese Website in den Automatisierungseinstellungen aktivieren.', 'Включите непрерывные нажатия для этого сайта в настройках автоматизации.', '自動操作の設定で、このサイトの連続クリックを有効にしてください。', '자동화 설정에서 이 사이트의 연속 클릭을 사용 설정하세요.', 'Activa los clics continuos para este sitio en la configuración de automatización.', 'Ative os cliques contínuos para este site nas configurações da automação.'],
    'auto.continuousWarning': ['Keep clicking Show more until the button disappears? This may take time or trigger site limits.', '将持续点击 Show more 直到按钮消失。可能耗时较长，也可能触发站点限制。继续？', '將持續點擊 Show more 直到按鈕消失。可能耗時較長，也可能觸發網站限制。繼續？', 'Cliquer sur Show more jusqu’à disparition du bouton ? Cela peut prendre du temps ou déclencher des limites du site.', 'Show more anklicken, bis die Schaltfläche verschwindet? Dies kann dauern oder Zugriffsbeschränkungen auslösen.', 'Нажимать Show more, пока кнопка не исчезнет? Это может занять время или вызвать ограничения сайта.', 'Show more ボタンが消えるまでクリックしますか？時間がかかるか、サイトの制限に達する可能性があります。', 'Show more 버튼이 사라질 때까지 클릭할까요? 시간이 걸리거나 사이트 제한이 적용될 수 있습니다.', '¿Pulsar Show more hasta que desaparezca el botón? Puede tardar o activar límites del sitio.', 'Clicar em Show more até o botão desaparecer? Isso pode demorar ou acionar limites do site.'],
    'auto.showMoreCountMismatch': ['The booklist is displayed, but the page has {loaded} books; expected {expected}.', '书单显示完毕，但页面有 {loaded} 本，预期为 {expected} 本，数量不符。', '書單顯示完畢，但頁面有 {loaded} 本，預期為 {expected} 本，數量不符。', 'La liste de livres est entièrement affichée, mais la page contient {loaded} livres au lieu des {expected} attendus.', 'Die Bücherliste wird vollständig angezeigt, aber die Seite enthält {loaded} statt der erwarteten {expected} Bücher.', 'Список книг показан полностью, но на странице {loaded} книг вместо ожидаемых {expected}.', '書籍リストの表示は終了しましたが、ページには {loaded} 冊あり、予想された {expected} 冊と一致しません。', '도서 목록 표시가 끝났지만 페이지에는 {loaded}권이 있으며 예상한 {expected}권과 다릅니다.', 'Se muestra toda la lista, pero la página tiene {loaded} libros en vez de los {expected} esperados.', 'A lista inteira foi exibida, mas a página tem {loaded} livros em vez dos {expected} esperados.'],
    'auto.showMoreCountUnknown': ['All books appear to be displayed, but the total cannot be verified.', '书单显示完毕；无法核对预期总数。', '書單顯示完畢；無法核對預期總數。', 'Tous les livres semblent affichés, mais le total ne peut pas être vérifié.', 'Alle Bücher scheinen angezeigt zu werden, aber die Gesamtzahl lässt sich nicht prüfen.', 'Похоже, показаны все книги, но проверить их общее число нельзя.', 'すべての本が表示されたようですが、総数は確認できません。', '모든 책이 표시된 것으로 보이지만 전체 수는 확인할 수 없습니다.', 'Parece que se muestran todos los libros, pero no se puede verificar el total.', 'Todos os livros parecem estar exibidos, mas não é possível confirmar o total.'],
    'auto.stop': ['Stop clicking', '停止连点', '停止連點', 'Arrêter les clics', 'Klicken stoppen', 'Остановить нажатия', '連続クリックを停止', '연속 클릭 중지', 'Detener los clics', 'Parar os cliques'],
    'auto.cancelled': ['Stopped by you.', '已手动停止。', '已手動停止。', 'Arrêté à votre demande.', 'Von Ihnen gestoppt.', 'Остановлено вами.', '手動で停止しました。', '사용자가 중지했습니다.', 'Detenido por ti.', 'Interrompido por você.'],
    'auto.running': ['Running: {action}', '[运行中] {action}', '[執行中] {action}', 'En cours : {action}', 'Wird ausgeführt: {action}', 'Выполняется: {action}', '実行中：{action}', '실행 중: {action}', 'En curso: {action}', 'Em execução: {action}'],
    'auto.warning': ['No new books yet; stopping in {seconds}s: {action}', '[可能失败，{seconds} 秒后停止] {action}', '[可能失敗，{seconds} 秒後停止] {action}', 'Aucun nouveau livre ; arrêt dans {seconds} s : {action}', 'Noch keine neuen Bücher; Stopp in {seconds} s: {action}', 'Новых книг пока нет; остановка через {seconds} с: {action}', '新しい本が追加されていません。{seconds}秒後に停止します：{action}', '새 책이 아직 추가되지 않았습니다. {seconds}초 후 중지: {action}', 'Aún no hay libros nuevos; se detendrá en {seconds} s: {action}', 'Ainda não há novos livros; parada em {seconds} s: {action}'],
    'auto.clicked': ['{action} (clicks attempted: {attempted})', '{action} [已尝试 {attempted} 次]', '{action} [已嘗試 {attempted} 次]', '{action} (clics tentés : {attempted})', '{action} (Klickversuche: {attempted})', '{action} (попыток нажатия: {attempted})', '{action}（クリック試行：{attempted}回）', '{action}(클릭 시도: {attempted}회)', '{action} (clics intentados: {attempted})', '{action} (cliques tentados: {attempted})'],
    'auto.clickedFailed': ['{action} (attempted: {attempted}; failed: {failed})', '{action} [已尝试 {attempted} 次，失败 {failed} 次]', '{action} [已嘗試 {attempted} 次，失敗 {failed} 次]', '{action} (tentatives : {attempted} ; échecs : {failed})', '{action} (Versuche: {attempted}; fehlgeschlagen: {failed})', '{action} (попыток: {attempted}; ошибок: {failed})', '{action}（試行：{attempted}回、失敗：{failed}回）', '{action}(시도: {attempted}회, 실패: {failed}회)', '{action} (intentos: {attempted}; fallos: {failed})', '{action} (tentativas: {attempted}; falhas: {failed})'],
    'auto.resetShowMore': ['Reset Show more availability', '重置 Show more 按钮可用性', '重設 Show more 按鈕可用性', 'Rétablir le bouton Show more', 'Show-more-Schaltfläche zurücksetzen', 'Восстановить кнопку Show more', 'Show more ボタンを再有効化', 'Show more 버튼 사용 가능 상태 재설정', 'Restablecer botón Show more', 'Restaurar botão Show more'],
    'auto.resetCaution': ["Reset only tries to clear the button's disabled or aria-disabled state. We cannot confirm whether the site will accept further Show more requests. If the button still does not work, refresh this page.", "“重置”只会尝试清除按钮的 disabled 或 aria-disabled 状态，无法确认站点是否会继续接收show more 请求，如果重置后按钮依然无法使用，请刷新本页面。", "「重設」只會嘗試清除按鈕的 disabled 或 aria-disabled 狀態，無法確認網站是否會繼續接收 Show more 請求；如果重設後按鈕仍無法使用，請重新整理本頁面。", "La réinitialisation essaie seulement de supprimer l’état disabled ou aria-disabled du bouton. Impossible de confirmer que le site acceptera d’autres demandes Show more. Si le bouton ne fonctionne toujours pas, actualisez cette page.", "Das Zurücksetzen versucht nur, disabled oder aria-disabled von der Schaltfläche zu entfernen. Ob die Website weitere Show more-Anfragen annimmt, lässt sich nicht bestätigen. Falls die Schaltfläche weiterhin nicht funktioniert, laden Sie diese Seite neu.", "Сброс только пытается убрать у кнопки состояние disabled или aria-disabled. Нельзя подтвердить, что сайт примет следующие запросы Show more. Если кнопка по-прежнему не работает, обновите страницу.", "リセットではボタンの disabled または aria-disabled 状態の解除だけを試みます。サイトが今後も Show more のリクエストを受け付けるかは確認できません。ボタンがまだ使えない場合は、このページを再読み込みしてください。", "재설정은 버튼의 disabled 또는 aria-disabled 상태를 해제하려고 시도할 뿐입니다. 사이트가 이후 Show more 요청을 받는지는 확인할 수 없습니다. 버튼이 여전히 작동하지 않으면 이 페이지를 새로고침하세요.", "El restablecimiento solo intenta quitar el estado disabled o aria-disabled del botón. No podemos confirmar si el sitio aceptará más solicitudes de Show more. Si el botón sigue sin funcionar, actualiza esta página.", "A redefinição apenas tenta remover o estado disabled ou aria-disabled do botão. Não é possível confirmar se o site aceitará novas solicitações de Show more. Se o botão continuar sem funcionar, atualize esta página."],
    'auto.resetFailed': ["Reset failed. Could not restore Show more. Refresh this page.", "重置失败：无法恢复 Show more，请刷新本页面。", "重設失敗：無法恢復 Show more，請重新整理本頁面。", "Échec de la réinitialisation : impossible de rétablir Show more. Actualisez cette page.", "Zurücksetzen fehlgeschlagen: Show more konnte nicht wiederhergestellt werden. Laden Sie diese Seite neu.", "Сброс не удался: не удалось восстановить Show more. Обновите страницу.", "リセットに失敗しました。Show more を復元できません。このページを再読み込みしてください。", "재설정에 실패했습니다. Show more를 복구하지 못했습니다. 이 페이지를 새로고침하세요.", "Error al restablecer: no se pudo recuperar Show more. Actualiza esta página.", "Falha ao redefinir: não foi possível restaurar Show more. Atualize esta página."],
    'auto.openAll': ['Open all currently visible book pages', '打开当前显示的所有图书页面', '開啟目前顯示的所有圖書頁面', 'Ouvrir les pages de tous les livres actuellement visibles', 'Seiten aller derzeit sichtbaren Bücher öffnen', 'Открыть страницы всех видимых сейчас книг', '現在表示中の本のページをすべて開く', '현재 표시된 모든 책의 페이지 열기', 'Abrir las páginas de todos los libros visibles', 'Abrir as páginas de todos os livros visíveis'],
    'auto.favorite': ['Add all books on this page to favorites', '本页全部加入收藏', '本頁全部加入收藏', 'Ajouter tous les livres de cette page aux favoris', 'Alle Bücher auf dieser Seite zu Favoriten hinzufügen', 'Добавить все книги на этой странице в избранное', 'このページの全書籍をお気に入りに追加', '이 페이지의 모든 책을 즐겨찾기에 추가', 'Añadir todos los libros de esta página a favoritos', 'Adicionar todos os livros desta página aos favoritos'],
    'auto.dev': ['In development', '开发中', '開發中', 'En développement', 'In Entwicklung', 'В разработке', '開発中', '개발 중', 'En desarrollo', 'Em desenvolvimento'],
    'auto.firstWarning': ['Try to open {count} pages? This may slow your browser or trigger site rate limits.', '尝试打开 {count} 个页面？浏览器可能变慢，站点也可能限流。', '嘗試開啟 {count} 個頁面？瀏覽器可能變慢，網站也可能限制請求。', 'Tenter d’ouvrir {count} pages ? Cela peut ralentir le navigateur ou déclencher une limitation du site.', 'Möchten Sie versuchen, {count} Buchseiten zu öffnen? Das kann den Browser verlangsamen oder Beschränkungen der Website auslösen.', 'Попытаться открыть {count} страниц? Браузер может замедлиться, а сайт — ограничить запросы.', '{count} ページを開こうとしますか？動作低下やアクセス制限の可能性があります。', '{count}개 페이지를 열어 볼까요? 브라우저가 느려지거나 사이트에서 요청을 제한할 수 있습니다.', '¿Intentar abrir {count} páginas? Puede ralentizar el navegador o activar límites del sitio.', 'Tentar abrir {count} páginas de livros? Isso pode deixar o navegador lento ou acionar limites do site.'],
    'auto.repeatWarning': ['Already run on this page; {count} pages may open again.', '本页已执行过，可能重复打开 {count} 个页面。', '本頁已執行過，可能重複開啟 {count} 個頁面。', 'Déjà exécuté ici ; {count} pages pourraient rouvrir.', 'Diese Aktion wurde auf dieser Seite bereits ausgeführt; {count} Buchseiten könnten erneut geöffnet werden.', 'Уже запускалось здесь; {count} страниц могут открыться снова.', 'このページで実行済みです。{count} ページが再度開く可能性があります。', '이 페이지에서 이미 실행했습니다. {count}개 페이지가 다시 열릴 수 있습니다.', 'Ya se ejecutó aquí; podrían reabrirse {count} páginas.', 'Esta ação já foi executada nesta página; {count} páginas podem ser abertas novamente.'],
    'auto.secondWarning': ['This tool cannot close opened tabs in bulk. Continue?', '本工具无法批量关闭已打开的标签页。继续？', '本工具無法批次關閉已開啟的分頁。繼續？', 'Cet outil ne peut pas fermer plusieurs onglets ouverts à la fois. Continuer ?', 'Dieses Tool kann geöffnete Tabs nicht auf einmal schließen. Fortfahren?', 'Этот инструмент не может закрыть все открытые вкладки разом. Продолжить?', 'このツールでは開いたタブを一括で閉じられません。続行しますか？', '이 도구는 열린 탭을 일괄로 닫을 수 없습니다. 계속하시겠습니까?', 'Esta herramienta no puede cerrar varias pestañas abiertas a la vez. ¿Continuar?', 'Esta ferramenta não consegue fechar várias abas abertas de uma só vez. Continuar?'],
    'auto.cancel': ['Cancel', '取消', '取消', 'Annuler', 'Abbrechen', 'Отмена', 'キャンセル', '취소', 'Cancelar', 'Cancelar'],
    'auto.continue': ['Continue', '继续', '繼續', 'Continuer', 'Weiter', 'Продолжить', '続行', '계속', 'Continuar', 'Continuar'],
    'auto.close': ['Close', '关闭', '關閉', 'Fermer', 'Schließen', 'Закрыть', '閉じる', '닫기', 'Cerrar', 'Fechar'],
    'auto.showMoreEnd': ['The whole booklist is displayed.', '书单显示完毕。', '書單顯示完畢。', 'Toute la liste de livres est affichée.', 'Die gesamte Bücherliste wird angezeigt.', 'Весь список книг показан.', '書籍リストの表示が完了しました。', '전체 도서 목록이 표시되었습니다.', 'Se muestra toda la lista de libros.', 'A lista inteira de livros foi exibida.'],
    'auto.showMoreTimeout': ['Stopped: no new books for 10 seconds.', '已停止：连续 10 秒没有新增书籍。', '已停止：連續 10 秒沒有新增書籍。', 'Arrêt : aucun nouveau livre depuis 10 secondes.', 'Gestoppt: 10 Sekunden lang keine neuen Bücher.', 'Остановлено: новые книги не появлялись 10 секунд.', '停止：10 秒間、新しい本が追加されませんでした。', '중지: 10초 동안 새 책이 추가되지 않았습니다.', 'Detenido: 10 segundos sin libros nuevos.', 'Parou: 10 segundos sem novos livros.'],
    'auto.showMoreUnavailable': ['Show more is unavailable.', 'Show more 不可用。', 'Show more 無法使用。', 'Show more est indisponible.', 'Show more ist nicht verfügbar.', 'Кнопка Show more недоступна.', 'Show more が利用できません。', 'Show more를 사용할 수 없습니다.', 'Show more no está disponible.', 'Show more está indisponível.'],
    'auto.showMoreError': ['Stopped after an error.', '发生错误，已停止。', '發生錯誤，已停止。', 'Arrêt après une erreur.', 'Nach Fehler gestoppt.', 'Остановлено из-за ошибки.', 'エラーで停止しました。', '오류로 중지했습니다.', 'Se detuvo por un error.', 'Parou após um erro.'],
    'auto.bulkDisabled': ['Enable bulk opening for this site in Automation settings.', '请先在自动化设置中启用本站批量打开。', '請先在自動化設定中啟用本站批次開啟。', 'Activez l’ouverture groupée pour ce site dans les réglages de l’automatisation.', 'Öffnen mehrerer Buchseiten für diese Website in den Automatisierungseinstellungen aktivieren.', 'Разрешите открытие нескольких страниц книг для этого сайта в настройках автоматизации.', '自動操作の設定で、このサイトで書籍ページをまとめて開く機能を有効にしてください。', '자동화 설정에서 이 사이트의 책 페이지 한꺼번에 열기를 사용 설정하세요.', 'Activa la apertura masiva para este sitio en la configuración de automatización.', 'Ative a abertura de várias páginas para este site nas configurações da automação.'],
    'auto.bulkApi': ['GM_openInTab is unavailable.', '脚本管理器未提供 GM_openInTab。', '腳本管理器未提供 GM_openInTab。', 'GM_openInTab est indisponible.', 'GM_openInTab ist nicht verfügbar.', 'GM_openInTab недоступен.', 'GM_openInTab が利用できません。', 'GM_openInTab을 사용할 수 없습니다.', 'GM_openInTab no está disponible.', 'GM_openInTab indisponível.'],
    'auto.bulkFilters': ['Check filter rules and wait for download status.', '请检查筛选规则，并等待下载状态就绪。', '請檢查篩選規則，並等待下載狀態就緒。', 'Vérifiez les filtres et attendez l’état des téléchargements.', 'Filterregeln prüfen und auf den Downloadstatus warten.', 'Проверьте правила фильтрации и дождитесь статуса загрузки.', '絞り込み条件を確認し、ダウンロード状態をお待ちください。', '필터 조건을 확인하고 다운로드 상태를 기다리세요.', 'Revisa los filtros y espera a que se confirme el estado de descarga.', 'Verifique os filtros e aguarde o status de download.'],
    'auto.bulkUnknown': ['Some download statuses are unknown; bulk opening is paused.', '部分下载状态未知，批量打开已暂停。', '部分下載狀態未知，批次開啟暫停。', 'Certains états de téléchargement sont inconnus ; ouverture en pause.', 'Einige Downloadstatus unbekannt; Öffnen pausiert.', 'Статус скачивания некоторых книг неизвестен; открытие страниц приостановлено.', '一部の本はダウンロード状態が不明なため、まとめて開く操作を一時停止しています。', '일부 책의 다운로드 상태를 알 수 없어 한꺼번에 열기를 일시 중지합니다.', 'Algunos estados son desconocidos; apertura en pausa.', 'O status de download de alguns livros é desconhecido; a abertura de páginas está pausada.'],
    'auto.bulkEmpty': ['No visible book pages are eligible to open.', '当前没有可打开的可见书籍链接。', '目前沒有可開啟的可見書籍連結。', 'Aucune page de livre visible ne peut être ouverte.', 'Keine sichtbaren Buchseiten können geöffnet werden.', 'Нет страниц видимых книг, которые можно открыть.', '現在表示中の本に、開けるページがありません。', '현재 표시된 책 중 열 수 있는 페이지가 없습니다.', 'No hay páginas de libros visibles que se puedan abrir.', 'Não há páginas de livros visíveis que possam ser abertas.'],
    'auto.bulkChanged': ['List or permission changed; nothing was opened.', '书单或权限已变化，本次没有打开页面。', '書單或權限已變更，本次未開啟頁面。', 'La liste ou l’autorisation a changé ; aucune page n’a été ouverte.', 'Die Liste oder Berechtigung hat sich geändert; es wurde keine Seite geöffnet.', 'Список или разрешение изменились; ни одна страница не открыта.', 'リストまたは許可設定が変わったため、ページは開きませんでした。', '목록이나 허용 설정이 바뀌어 페이지를 열지 않았습니다.', 'La lista o el permiso ha cambiado; no se ha abierto ninguna página.', 'A lista ou a permissão mudou; nenhuma página foi aberta.'],
    'auto.bulkProgress': ['Attempted {attempted}; submitted {submitted}; failed {failed}. Submission does not mean loaded.', '已尝试 {attempted}；已提交打开 {submitted}；失败 {failed}。提交不等于加载成功。', '已嘗試 {attempted}；已提交開啟 {submitted}；失敗 {failed}。提交不等於載入成功。', 'Tentatives : {attempted} ; ouvertures demandées : {submitted} ; échecs : {failed}. Une demande ne garantit pas le chargement.', 'Versuche: {attempted}; Öffnungsanfragen: {submitted}; fehlgeschlagen: {failed}. Eine Anfrage garantiert nicht, dass die Seite geladen wurde.', 'Попыток: {attempted}; запросов на открытие: {submitted}; ошибок: {failed}. Отправка запроса не гарантирует загрузку страницы.', '試行：{attempted}件、開く要求：{submitted}件、失敗：{failed}件。要求を送っても、ページが読み込まれたとは限りません。', '시도: {attempted}건, 열기 요청: {submitted}건, 실패: {failed}건. 열기 요청을 보냈다고 해서 페이지가 로드된 것은 아닙니다.', 'Intentos: {attempted}; solicitudes enviadas: {submitted}; fallos: {failed}. Enviar una solicitud no garantiza que la página se cargue.', 'Tentativas: {attempted}; solicitações enviadas: {submitted}; falhas: {failed}. Enviar uma solicitação não garante que a página carregue.'],
    'rule.manual': ['Set a rule', '请手动设置', '請手動設定', 'Définir une règle', 'Regel festlegen', 'Задайте правило', '条件を設定', '규칙 설정', 'Configure una regla', 'Defina uma regra'],
    'rule.conflict': ['Invalid year range', '设置冲突', '設定衝突', 'Plage d’années invalide', 'Ungültiger Jahresbereich', 'Неверный диапазон лет', '年の範囲が無効です', '연도 범위가 올바르지 않음', 'Rango de años no válido', 'Intervalo de anos inválido'],
    'rule.waiting': ['Waiting for download status', '等待下载状态', '等待下載狀態', 'En attente de l’état de téléchargement', 'Warte auf Downloadstatus', 'Ожидание статуса скачивания', 'ダウンロード状態を待機中', '다운로드 상태 대기 중', 'Esperando estado de descarga', 'Aguardando status de download'],
    'rule.unconfirmed': ['Download status unconfirmed', '下载状态未确认', '下載狀態未確認', 'État des téléchargements non confirmé', 'Downloadstatus unbestätigt', 'Статус скачивания не подтверждён', 'ダウンロード状態を確認できません', '다운로드 상태 미확인', 'Estado de descarga no confirmado', 'Status de download não confirmado'],
    'rule.missingYear': ['include books without a year', '含无年份书籍', '包含未標年份的書籍', 'inclure les livres sans année', 'Bücher ohne Jahr einschließen', 'включая книги без года', '年不明の本を含む', '연도 없는 책 포함', 'incluir libros sin año', 'incluir livros sem ano'],
    'hint.formatEmpty': ['Select at least one format to apply this filter.', '请选择筛选格式；当前不隐藏条目', '請選擇格式；目前不隱藏條目', 'Choisissez au moins un format pour appliquer ce filtre.', 'Mindestens ein Format auswählen, um diesen Filter anzuwenden.', 'Выберите хотя бы один формат, чтобы применить фильтр.', '形式を1つ以上選ぶと、絞り込みが適用されます。', '형식을 하나 이상 선택해야 필터가 적용됩니다.', 'Selecciona al menos un formato para aplicar este filtro.', 'Selecione pelo menos um formato para aplicar este filtro.'],
    'hint.sizeEmpty': ['Select a file size range to apply this filter.', '请选择文件大小范围，筛选才会生效。', '請選擇檔案大小範圍，篩選才會生效。', 'Choisissez une plage de taille pour activer ce filtre.', 'Wählen Sie einen Größenbereich, um diesen Filter anzuwenden.', 'Выберите диапазон размера, чтобы применить фильтр.', 'サイズの範囲を選ぶと、絞り込みが適用されます。', '크기 범위를 선택해야 필터가 적용됩니다.', 'Selecciona un rango de tamaño para aplicar este filtro.', 'Selecione uma faixa de tamanho para aplicar este filtro.'],
    'hint.invalidCustom': ['Invalid custom formats were skipped.', '部分自定义格式无效，已忽略', '部分自訂格式無效，已忽略', 'Formats personnalisés invalides ignorés.', 'Ungültige eigene Formate ignoriert.', 'Неверные форматы пропущены.', '無効なカスタム形式を無視しました。', '유효하지 않은 사용자 지정 형식은 건너뛰었습니다.', 'Se ignoraron formatos personalizados no válidos.', 'Formatos personalizados inválidos foram ignorados.'],
    'hint.yearEmpty': ['Enter a start or end year to apply this filter.', '请设置起始或截止年份；当前不按年份筛选', '請設定起始或截止年份；目前不依年份篩選', 'Saisissez une année de début ou de fin pour appliquer ce filtre.', 'Anfangs- oder Endjahr eingeben, um diesen Filter anzuwenden.', 'Введите начальный или конечный год, чтобы применить фильтр.', '開始年または終了年を入力すると、絞り込みが適用されます。', '시작 연도나 종료 연도를 입력해야 필터가 적용됩니다.', 'Introduce un año inicial o final para aplicar este filtro.', 'Digite um ano inicial ou final para aplicar este filtro.'],
    'hint.downloadWaiting': ['Waiting for download status. Filter paused.', '等待下载状态加载；下载筛选暂停', '等待下載狀態載入；下載篩選暫停', 'En attente de l’état de téléchargement ; filtre en pause.', 'Warte auf Downloadstatus; Filter pausiert.', 'Ожидание статуса скачивания. Фильтр приостановлен.', 'ダウンロード状態を確認中です。絞り込みは一時停止しています。', '다운로드 상태를 확인하는 동안 필터가 일시 중지됩니다.', 'Esperando el estado de descarga. Filtro en pausa.', 'Aguardando o status de download. Filtro pausado.'],
    'hint.downloadAmbiguous': ['Download records may be empty or unavailable. Filter paused.', '站点空记录与请求失败无法区分；下载筛选暂停', '無法區分空紀錄與請求失敗；篩選暫停', 'Les données de téléchargement sont peut-être vides ou indisponibles. Filtre en pause.', 'Die Downloaddaten sind möglicherweise leer oder nicht verfügbar. Filter pausiert.', 'Данные о скачиваниях могут быть пустыми или недоступными. Фильтр приостановлен.', 'ダウンロード記録が空か取得できないため、絞り込みを一時停止しています。', '다운로드 기록이 비어 있거나 확인할 수 없어 필터를 일시 중지했습니다.', 'Los registros de descarga pueden estar vacíos o no disponibles. Filtro en pausa.', 'Os registros de download podem estar vazios ou indisponíveis. Filtro pausado.'],
    'hint.downloadTimeout': ['Download status still unconfirmed after 30 seconds. Refresh the page or check that you are signed in.', '下载状态 30 秒内未确认；请刷新页面或检查是否已登录', '30 秒內未確認下載狀態；請重新整理或檢查登入', 'État de téléchargement non confirmé après 30 s. Actualisez la page ou vérifiez que vous êtes connecté.', 'Downloadstatus nach 30 Sekunden nicht bestätigt. Seite neu laden oder Anmeldung prüfen.', 'Статус скачивания не подтверждён за 30 секунд. Обновите страницу или проверьте, выполнен ли вход.', '30秒経ってもダウンロード状態を確認できません。ページを再読み込みするか、ログイン状態を確認してください。', '30초가 지나도 다운로드 상태를 확인할 수 없습니다. 페이지를 새로고침하거나 로그인 상태를 확인하세요.', 'El estado de descarga sigue sin confirmarse tras 30 s. Actualiza la página o comprueba que has iniciado sesión.', 'O status de download continua sem confirmação após 30 s. Atualize a página ou verifique se você está conectado.'],
    'hint.downloadFailed': ['Download status unavailable. Refresh the page or check that you are signed in.', '下载状态不可判定；请刷新页面或检查是否已登录', '無法判定下載狀態；請重新整理或檢查登入', 'État de téléchargement indisponible. Actualisez la page ou vérifiez que vous êtes connecté.', 'Downloadstatus nicht verfügbar. Seite neu laden oder Anmeldung prüfen.', 'Статус скачивания недоступен. Обновите страницу или проверьте, выполнен ли вход.', 'ダウンロード状態を確認できません。ページを再読み込みするか、ログイン状態を確認してください。', '다운로드 상태를 확인할 수 없습니다. 페이지를 새로고침하거나 로그인 상태를 확인하세요.', 'Estado de descarga no disponible. Actualiza la página o comprueba que has iniciado sesión.', 'Status de download indisponível. Atualize a página ou verifique se você está conectado.'],
    'hint.downloadUnknown': ['Books with unknown download status remain visible.', '部分条目的下载状态未知，已保留显示', '部分書籍下載狀態未知，仍會顯示', 'Les livres dont l’état de téléchargement est inconnu restent visibles.', 'Bücher mit unbekanntem Downloadstatus bleiben sichtbar.', 'Книги с неизвестным статусом скачивания остаются видимыми.', 'ダウンロード状態が不明な本は表示したままにしています。', '다운로드 상태를 알 수 없는 책은 계속 표시합니다.', 'Los libros con un estado de descarga desconocido siguen visibles.', 'Os livros com status de download desconhecido continuam visíveis.'],
    'hint.structure': ['Some book details could not be found. The site layout may have changed.', '部分卡片信息位置未找到；页面结构可能已变', '部分卡片資訊找不到；頁面結構可能已變', 'Certaines informations des livres sont introuvables. La mise en page du site a peut-être changé.', 'Einige Buchangaben wurden nicht gefunden. Das Seitenlayout hat sich möglicherweise geändert.', 'Некоторые сведения о книгах не найдены. Возможно, изменилась структура страницы.', '一部の書籍情報を取得できません。サイトの表示が変わった可能性があります。', '일부 책 정보를 찾지 못했습니다. 사이트 화면 구성이 바뀌었을 수 있습니다.', 'No se han encontrado algunos datos de los libros. Puede que haya cambiado el diseño del sitio.', 'Algumas informações dos livros não foram encontradas. O layout do site pode ter mudado.'],
    'hint.unknownFormat': ['Unknown format', '未知格式', '未知格式', 'Format inconnu', 'Unbekanntes Format', 'Неизвестный формат', '形式不明', '알 수 없는 형식', 'Formato desconocido', 'Formato desconhecido'],
    'hint.yearPending': ['Year filter needs a start or end year', '年份规则待设置', '年份規則待設定', 'Le filtre par année nécessite une année de début ou de fin', 'Für den Jahresfilter ist ein Anfangs- oder Endjahr erforderlich', 'Для фильтра по году нужен начальный или конечный год', '年で絞り込むには開始年か終了年を入力してください', '연도로 필터링하려면 시작 연도나 종료 연도를 입력하세요', 'El filtro por año necesita un año inicial o final', 'O filtro por ano precisa de um ano inicial ou final'],
    'hint.formatPending': ['Format filter needs a selection', '文件格式规则待设置', '格式規則待設定', 'Le filtre par format nécessite une sélection', 'Für den Formatfilter muss ein Format ausgewählt werden', 'Для фильтра по формату нужно выбрать формат', '形式で絞り込むには形式を選択してください', '형식으로 필터링하려면 형식을 선택하세요', 'El filtro por formato necesita una selección', 'O filtro por formato precisa de uma seleção'],
    'hint.sizePending': ['File size filter needs a selection', '文件大小规则待设置', '檔案大小規則待設定', 'Le filtre par taille nécessite une sélection', 'Für den Dateigrößenfilter muss ein Bereich ausgewählt werden', 'Для фильтра по размеру нужно выбрать диапазон', 'サイズで絞り込むには範囲を選択してください', '크기로 필터링하려면 범위를 선택하세요', 'El filtro por tamaño necesita una selección', 'O filtro por tamanho precisa de uma seleção'],
    'hint.downloadPaused': ['Download filter paused', '下载状态筛选暂停', '下載狀態篩選暫停', 'Filtre de téléchargement en pause', 'Downloadfilter pausiert', 'Фильтр по статусу скачивания приостановлен', 'ダウンロード状態による絞り込みは一時停止中', '다운로드 상태 필터 일시 중지', 'Filtro de descarga en pausa', 'Filtro de download pausado'],
    'action.settings': ['Settings', '设置', '設定', 'Paramètres', 'Einstellungen', 'Настройки', '設定', '설정', 'Configuración', 'Configurações'],
    'action.globalSettings': ['Global settings', '全局设置', '全域設定', 'Paramètres généraux', 'Globale Einstellungen', 'Общие настройки', '全体設定', '전역 설정', 'Ajustes generales', 'Configurações globais'],
    'action.configureFormat': ['Configure file format filter', '配置文件格式筛选', '設定檔案格式篩選', 'Configurer le filtre des formats', 'Formatfilter konfigurieren', 'Настроить фильтр форматов', 'ファイル形式の絞り込みを設定', '파일 형식 필터 설정', 'Configurar filtro de formato', 'Configurar filtro de formato'],
    'action.configureSize': ['Configure file size filter', '配置文件大小筛选', '設定檔案大小篩選', 'Configurer le filtre de taille des fichiers', 'Dateigrößenfilter konfigurieren', 'Настроить фильтр по размеру файла', 'ファイルサイズの絞り込みを設定', '파일 크기 필터 설정', 'Configurar filtro de tamaño de archivo', 'Configurar filtro de tamanho de arquivo'],
    'action.configureDownload': ['Configure download status filter', '配置下载状态筛选', '設定下載狀態篩選', 'Configurer le filtre selon l’état de téléchargement', 'Downloadstatusfilter konfigurieren', 'Настроить фильтр по статусу скачивания', 'ダウンロード状態の絞り込みを設定', '다운로드 상태 필터 설정', 'Configurar el filtro por estado de descarga', 'Configurar filtro por status de download'],
    'action.configureYear': ['Configure year filter', '配置年份筛选', '設定年份篩選', 'Configurer le filtre des années', 'Jahresfilter konfigurieren', 'Настроить фильтр года', '出版年の絞り込みを設定', '연도 필터 설정', 'Configurar filtro de año', 'Configurar filtro de ano'],
    'action.configureAutomation': ['Configure automation', '配置自动化', '設定自動化', 'Configurer l’automatisation', 'Automatisierung konfigurieren', 'Настроить автоматизацию', '自動操作を設定', '자동화 설정', 'Configurar automatización', 'Configurar automação'],
    'action.collapse': ['Collapse panel', '折叠面板', '收合面板', 'Réduire le panneau', 'Panel einklappen', 'Свернуть панель', 'パネルを折りたたむ', '패널 접기', 'Contraer panel', 'Recolher painel'],
    'action.expand': ['Expand panel', '展开面板', '展開面板', 'Développer le panneau', 'Panel ausklappen', 'Развернуть панель', 'パネルを展開する', '패널 펼치기', 'Expandir panel', 'Expandir painel'],
    'action.waitDownload': ['Waiting for download status', '等待下载状态', '等待下載狀態', 'En attente de l’état de téléchargement', 'Warte auf Downloadstatus', 'Ожидание статуса скачивания', 'ダウンロード状態を待機中', '다운로드 상태 대기 중', 'Esperando estado de descarga', 'Aguardando status de download'],
    'action.downloadUnconfirmed': ['Download status unconfirmed', '下载状态未确认', '下載狀態未確認', 'État non confirmé', 'Status unbestätigt', 'Статус скачивания не подтверждён', '状態未確認', '상태 미확인', 'Estado no confirmado', 'Status não confirmado'],
    'coexist.detectedBefore': ['The', '检测到', '偵測到', 'Le', 'Das', 'На этой странице работает', 'このページで', '이 페이지에서', 'El', 'O'],
    'coexist.script': ['UI Enhance script', 'UI Enhance 脚本', 'UI Enhance 腳本', 'script UI Enhance', 'UI-Enhance-Skript', 'скрипт UI Enhance', 'UI Enhance スクリプト', 'UI Enhance 스크립트', 'script UI Enhance', 'script UI Enhance'],
    'coexist.detectedAfter': ['is running on this page. Compatibility issues are possible.', '在此页运行，可能存在兼容性问题。', '正在此頁執行，可能有相容性問題。', 'est actif sur cette page. Des incompatibilités sont possibles.', 'ist auf dieser Seite aktiv. Kompatibilitätsprobleme sind möglich.', '. Возможны проблемы совместимости.', 'が動作しています。互換性の問題が起こる可能性があります。', '가 실행 중입니다. 호환성 문제가 생길 수 있습니다.', 'está activo en esta página. Puede haber incompatibilidades.', 'está em execução nesta página. Pode haver incompatibilidades.'],
    'coexist.conditionalBefore': ['This tool may have compatibility issues with the', '本工具与', '本工具與', 'Cet outil et le', 'Dieses Tool und das', 'Этот инструмент и', 'このツールは', '이 도구는', 'Esta herramienta y el', 'Esta ferramenta e o'],
    'coexist.conditionalAfter': ['.', '可能有兼容性问题。', '可能有相容性問題。', 'peuvent être incompatibles.', 'könnten inkompatibel sein.', 'могут быть несовместимы.', 'との互換性に問題が生じる可能性があります。', '와 호환성 문제가 발생할 수 있습니다.', 'pueden ser incompatibles.', 'podem ser incompatíveis.'],
    'coexist.details': ['Learn more', '了解详情', '瞭解詳情', 'En savoir plus', 'Details', 'Подробнее', '詳しく見る', '자세히 보기', 'Más información', 'Saiba mais'],
    'coexist.dismiss': ['Dismiss warning', '关闭提示', '關閉提示', 'Masquer l’avertissement', 'Hinweis schließen', 'Скрыть предупреждение', '通知を閉じる', '알림 닫기', 'Cerrar aviso', 'Dispensar aviso'],
    'coexist.link': ['⚠ Script conflict notice', '⚠脚本冲突提示', '⚠腳本衝突提示', '⚠ Conflit entre scripts', '⚠ Hinweis auf Skriptkonflikt', '⚠ Предупреждение о конфликте скриптов', '⚠ スクリプト競合の注意', '⚠ 스크립트 충돌 안내', '⚠ Aviso de conflicto entre scripts', '⚠ Aviso de conflito entre scripts'],
    'coexist.title': ['Compatibility with UI Enhance', '与 UI Enhance 的兼容性', '與 UI Enhance 的相容性', 'Compatibilité avec UI Enhance', 'Kompatibilität mit UI Enhance', 'Совместимость с UI Enhance', 'UI Enhance との互換性', 'UI Enhance 호환성', 'Compatibilidad con UI Enhance', 'Compatibilidade com UI Enhance'],
    'coexist.intro': ['This tool counts and filters books currently on the page. Books removed by another script are excluded. The effects below depend on which UI Enhance features are enabled.', '本工具依据当前页面上的书籍进行统计和筛选；被其他脚本移除的书籍不在其中。以下影响取决于 UI Enhance 启用了哪些功能。', '本工具依據目前頁面上的書籍進行統計和篩選；被其他腳本移除的書籍不在其中。以下影響取決於 UI Enhance 啟用了哪些功能。', 'Cet outil compte et filtre les livres présents sur la page. Ceux qu’un autre script retire sont exclus. Les effets ci-dessous dépendent des fonctions activées dans UI Enhance.', 'Dieses Tool zählt und filtert die Bücher auf der aktuellen Seite. Von einem anderen Skript entfernte Bücher sind ausgeschlossen. Welche Folgen auftreten, hängt von den aktivierten UI-Enhance-Funktionen ab.', 'Этот инструмент считает и фильтрует книги на странице. Книги, удалённые другим скриптом, не учитываются. Последствия зависят от включённых функций UI Enhance.', 'このツールは現在のページにある本を集計・絞り込みます。他のスクリプトが削除した本は対象外です。以下の影響は UI Enhance で有効にした機能によって異なります。', '이 도구는 현재 페이지에 있는 책을 집계하고 필터링합니다. 다른 스크립트가 제거한 책은 제외됩니다. 아래 영향은 UI Enhance에서 켠 기능에 따라 달라집니다.', 'Esta herramienta cuenta y filtra los libros presentes en la página. Excluye los que elimine otro script. Los efectos siguientes dependen de las funciones activadas en UI Enhance.', 'Esta ferramenta conta e filtra os livros presentes na página. Livros removidos por outro script ficam de fora. Os efeitos abaixo dependem das funções ativadas no UI Enhance.'],
    'coexist.booklist': ['Booklists: UI Enhance’s language filter removes nonmatching cards. This tool’s loaded count may drop, and automatic Show more clicks may stop if new cards are removed. Clearing the language selection does not restore those cards; reload the page if needed.', '书单：UI Enhance 的语言筛选会移除不匹配的书卡。本工具的已加载数量可能减少；若新书卡被移除，自动连点 Show more 也可能停止。清空语言选择不会恢复这些书卡，必要时请刷新页面。', '書單：UI Enhance 的語言篩選會移除不符的書卡。本工具的已載入數量可能減少；若新書卡被移除，自動連點 Show more 也可能停止。清除語言選擇不會還原這些書卡，必要時請重新整理頁面。', 'Listes : le filtre de langue d’UI Enhance retire les cartes non correspondantes. Le nombre de livres chargés peut baisser et les clics automatiques sur Show more peuvent s’arrêter si les nouvelles cartes sont retirées. Effacer la sélection ne restaure pas ces cartes ; rechargez la page si besoin.', 'Bücherlisten: Der Sprachfilter von UI Enhance entfernt nicht passende Karten. Die Zahl geladener Bücher kann sinken; automatische Show-more-Klicks können stoppen, wenn neue Karten entfernt werden. Das Aufheben der Sprachauswahl stellt sie nicht wieder her. Laden Sie die Seite bei Bedarf neu.', 'Списки: языковой фильтр UI Enhance удаляет неподходящие карточки. Число загруженных книг может снизиться, а автоматические нажатия Show more — остановиться, если новые карточки удалены. Сброс выбора языка не вернёт их; при необходимости обновите страницу.', '書籍リスト：UI Enhance の言語フィルターは条件に合わないカードを削除します。このツールの読込済み件数が減り、新しいカードも削除されると Show more の自動クリックが停止する場合があります。言語の選択を解除してもカードは戻りません。必要ならページを再読み込みしてください。', '책 목록: UI Enhance의 언어 필터는 조건에 맞지 않는 카드를 제거합니다. 이 도구의 불러온 책 수가 줄고, 새 카드도 제거되면 Show more 자동 클릭이 멈출 수 있습니다. 언어 선택을 해제해도 카드는 복원되지 않으니 필요하면 새로고침하세요.', 'Listas: el filtro de idioma de UI Enhance elimina las tarjetas que no coinciden. Puede bajar el número de libros cargados y detenerse los clics automáticos en Show more si se eliminan tarjetas nuevas. Quitar la selección de idioma no las restaura; recarga la página si hace falta.', 'Listas: o filtro de idioma do UI Enhance remove cartões que não correspondem. A contagem de livros carregados pode cair, e os cliques automáticos em Show more podem parar se novos cartões forem removidos. Limpar a seleção de idioma não os restaura; recarregue a página se necessário.'],
    'coexist.recommend': ['Home and Z-Recommend: when its recommendation filter is enabled, UI Enhance may remove downloaded books. This tool cannot recover them for the downloaded-only filter.', '首页与 Z-Recommend：启用推荐过滤时，UI Enhance 可能移除已下载图书；本工具的“仅已下载”无法找回这些书。', '首頁與 Z-Recommend：啟用推薦篩選時，UI Enhance 可能移除已下載書籍；本工具的「僅已下載」無法找回這些書。', 'Accueil et Z-Recommend : si son filtre de recommandations est actif, UI Enhance peut retirer les livres téléchargés. Le filtre « téléchargés uniquement » ne peut pas les récupérer.', 'Startseite und Z-Recommend: Bei aktivem Empfehlungsfilter kann UI Enhance heruntergeladene Bücher entfernen. Der Filter „nur heruntergeladene“ kann sie nicht zurückholen.', 'Главная и Z-Recommend: при включённом фильтре рекомендаций UI Enhance может удалить скачанные книги. Фильтр «только скачанные» не может их вернуть.', 'ホームと Z-Recommend：推薦フィルターが有効な場合、UI Enhance はダウンロード済みの本を削除することがあります。「ダウンロード済みのみ」では戻せません。', '홈과 Z-Recommend: 추천 필터가 켜져 있으면 UI Enhance가 다운로드한 책을 제거할 수 있습니다. 이 도구의 다운로드한 책만 보기로는 복원할 수 없습니다.', 'Inicio y Z-Recommend: con su filtro de recomendaciones activo, UI Enhance puede quitar libros descargados. «Solo descargados» no puede recuperarlos.', 'Início e Z-Recommend: com o filtro de recomendações ativo, o UI Enhance pode remover livros baixados. O filtro «somente baixados» não consegue recuperá-los.'],
    'coexist.search': ['Search: UI Enhance may collapse books with the same ISBN. This tool may still filter the hidden editions, so the filter can affect more books than you see.', '搜索：UI Enhance 可能折叠相同 ISBN 的书籍。本工具仍可能筛选被隐藏的版本，因此筛选范围可能大于当前可见的结果。', '搜尋：UI Enhance 可能收合相同 ISBN 的書籍。本工具仍可能篩選被隱藏的版本，因此篩選範圍可能大於目前可見的結果。', 'Recherche : UI Enhance peut regrouper les livres ayant le même ISBN. Cet outil peut aussi filtrer les éditions masquées ; le filtre peut donc toucher plus de livres que ceux affichés.', 'Suche: UI Enhance kann Bücher mit gleicher ISBN einklappen. Dieses Tool kann auch ausgeblendete Ausgaben filtern; der Filter kann daher mehr Bücher erfassen als sichtbar sind.', 'Поиск: UI Enhance может сворачивать книги с одинаковым ISBN. Этот инструмент может фильтровать и скрытые издания, поэтому фильтр может затронуть больше книг, чем видно.', '検索：UI Enhance は同じ ISBN の本を折りたたむことがあります。このツールは非表示の版も絞り込む場合があり、表示中の本より多くの本が対象になることがあります。', '검색: UI Enhance가 ISBN이 같은 책을 접을 수 있습니다. 이 도구는 숨겨진 판본도 필터링할 수 있어, 화면에 보이는 책보다 더 많은 책이 영향을 받을 수 있습니다.', 'Búsqueda: UI Enhance puede agrupar libros con el mismo ISBN. Esta herramienta también puede filtrar ediciones ocultas, por lo que el filtro puede afectar a más libros de los visibles.', 'Busca: o UI Enhance pode agrupar livros com o mesmo ISBN. Esta ferramenta também pode filtrar edições ocultas, então o filtro pode afetar mais livros do que os visíveis.'],
    'coexist.download': ['Download status: after UI Enhance downloads or opens a book for online reading, this tool’s filters and counts may not update immediately. Refresh the page if they appear stale.', '下载状态：UI Enhance 下载图书或打开在线阅读后，本工具的筛选与统计可能未立即刷新；若状态不符，请刷新页面核对。', '下載狀態：UI Enhance 下載書籍或開啟線上閱讀後，本工具的篩選與統計可能未立即更新；若狀態不符，請重新整理頁面核對。', 'État des téléchargements : après un téléchargement ou une lecture en ligne via UI Enhance, les filtres et comptes peuvent tarder à se mettre à jour. Rechargez la page si besoin.', 'Downloadstatus: Nach einem Download oder dem Öffnen zum Online-Lesen über UI Enhance können Filter und Zählungen verzögert aktualisiert werden. Laden Sie die Seite bei Bedarf neu.', 'Статус скачивания: после скачивания или открытия онлайн-чтения через UI Enhance фильтры и счётчики могут обновиться не сразу. При расхождении обновите страницу.', 'ダウンロード状態：UI Enhance でダウンロードやオンライン閲覧を行った後、絞り込みと件数がすぐに更新されない場合があります。状態が違う場合はページを再読み込みしてください。', '다운로드 상태: UI Enhance로 다운로드하거나 온라인 읽기를 연 뒤 필터와 집계가 바로 갱신되지 않을 수 있습니다. 상태가 다르면 새로고침하세요.', 'Estado de descarga: tras descargar o leer en línea con UI Enhance, los filtros y recuentos pueden tardar en actualizarse. Recarga la página si no coinciden.', 'Estado de download: após baixar ou ler on-line com o UI Enhance, filtros e contagens podem demorar a atualizar. Recarregue a página se houver divergência.'],
    'coexist.actions': ['Copy and batch download: these UI Enhance buttons read the booklist through site APIs. They do not follow this tool’s page filters and may process books that are hidden here. Check UI Enhance’s own options before continuing.', '复制与批量下载：UI Enhance 的这两个按钮通过站点接口读取书单，不遵循本工具的页面筛选，可能处理当前未显示的图书。操作前请核对 UI Enhance 自己的设置。', '複製與批次下載：UI Enhance 的這兩個按鈕透過網站介面讀取書單，不遵循本工具的頁面篩選，可能處理目前未顯示的書籍。操作前請核對 UI Enhance 自己的設定。', 'Copie et téléchargement groupé : ces boutons d’UI Enhance lisent la liste via les API du site, sans suivre les filtres de cet outil. Ils peuvent traiter des livres masqués ; vérifiez leurs options avant de continuer.', 'Kopieren und Stapeldownload: Diese UI-Enhance-Schaltflächen lesen die Liste über die Website-API. Sie beachten die Seitenfilter dieses Tools nicht und können ausgeblendete Bücher verarbeiten. Prüfen Sie vorher die UI-Enhance-Optionen.', 'Копирование и пакетное скачивание: эти кнопки UI Enhance читают список через API сайта, не учитывая фильтры этого инструмента. Они могут обработать скрытые книги; проверьте настройки UI Enhance.', 'コピーと一括ダウンロード：UI Enhance のボタンはサイト API から書籍リストを読み込み、このツールのページ絞り込みを反映しません。非表示の本も処理され得るため、実行前に設定を確認してください。', '복사와 일괄 다운로드: UI Enhance 버튼은 사이트 API에서 책 목록을 읽으며 이 도구의 페이지 필터를 따르지 않습니다. 숨긴 책도 처리할 수 있으니 실행 전에 설정을 확인하세요.', 'Copiar y descargar en lote: estos botones de UI Enhance leen la lista mediante la API del sitio, sin seguir los filtros de esta herramienta. Pueden procesar libros ocultos; revisa sus opciones antes de continuar.', 'Copiar e baixar em lote: esses botões do UI Enhance leem a lista pela API do site e não seguem os filtros desta ferramenta. Podem processar livros ocultos; confira as opções antes de continuar.'],
    'coexist.signature': ['This notice is from Z-lib Booklist Enhancer.', '此提示由 Z-lib Booklist Enhancer（Z-Library 书单增强）提供。', '此提示由 Z-lib Booklist Enhancer（Z-Library 書單增強）提供。', 'Cet avis est fourni par Z-lib Booklist Enhancer.', 'Dieser Hinweis stammt von Z-lib Booklist Enhancer.', 'Это уведомление от Z-lib Booklist Enhancer.', 'この案内は Z-lib Booklist Enhancer が提供しています。', '이 안내는 Z-lib Booklist Enhancer에서 제공합니다.', 'Este aviso es de Z-lib Booklist Enhancer.', 'Este aviso é do Z-lib Booklist Enhancer.'],
    'coexist.about': ['Compatibility information', '兼容性说明', '相容性說明', 'Informations de compatibilité', 'Kompatibilitätsinformationen', 'Сведения о совместимости', '互換性について', '호환성 안내', 'Información de compatibilidad', 'Informações de compatibilidade'],
    'coexist.close': ['Close', '关闭', '關閉', 'Fermer', 'Schließen', 'Закрыть', '閉じる', '닫기', 'Cerrar', 'Fechar'],
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
        continuousEnabled: typeof prefs.continuousEnabled === 'boolean' ? prefs.continuousEnabled : false,
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
      showSize: typeof input.showSize === 'boolean' ? input.showSize : DEFAULT_SETTINGS.showSize,
      showProgress: typeof input.showProgress === 'boolean' ? input.showProgress : DEFAULT_SETTINGS.showProgress,
      showSummary: typeof input.showSummary === 'boolean' ? input.showSummary : DEFAULT_SETTINGS.showSummary,
      filterFormat: typeof input.filterFormat === 'boolean' ? input.filterFormat : DEFAULT_SETTINGS.filterFormat,
      filterSize: typeof input.filterSize === 'boolean' ? input.filterSize : DEFAULT_SETTINGS.filterSize,
      filterDownload: typeof input.filterDownload === 'boolean' ? input.filterDownload : DEFAULT_SETTINGS.filterDownload,
      formats: Array.isArray(input.formats)
        ? [...new Set(input.formats.filter(value => SETTING_FORMATS.has(value)))] : [],
      sizeBands: Array.isArray(input.sizeBands)
        ? [...new Set(input.sizeBands.filter(value => SIZE_BANDS.has(value)))] : [],
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
      showMoreCount1: Number.isInteger(input.showMoreCount1) && input.showMoreCount1 >= 1 && input.showMoreCount1 <= 50
        ? input.showMoreCount1 : DEFAULT_SETTINGS.showMoreCount1,
      showMoreCount2: Number.isInteger(input.showMoreCount2) && input.showMoreCount2 >= 1 && input.showMoreCount2 <= 50
        ? input.showMoreCount2 : DEFAULT_SETTINGS.showMoreCount2,
    };
  }

  function parseShowMoreCount(raw, fallback) {
    const valid = typeof raw === 'string' && /^(?:[1-9]|[1-4][0-9]|50)$/.test(raw);
    return { count: valid ? Number(raw) : fallback, valid };
  }

  function describeShowMoreCountInput(locale, raw, fallback) {
    const { count, valid } = parseShowMoreCount(raw, fallback);
    return { count, label: count === 1 ? translate(locale, 'auto.showMoreOne')
      : translate(locale, 'auto.showMore', { count }),
      error: valid ? '' : translate(locale, 'auto.countInvalid', { default: fallback }) };
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
      return { active: false, min, max, error: '起始年份不能大于截止年份' };
    }
    return { active: true, min, max, error: '' };
  }

  function matchesYear(rawYear, rule, includeMissingYear) {
    if (!rule.active) return true;
    const year = parseYearValue(rawYear);
    if (year === null) return !!includeMissingYear;
    return (rule.min === null || year >= rule.min) && (rule.max === null || year <= rule.max);
  }

  function parseBookTotalLabel(text) {
    const match = String(text ?? '').match(/\bbooks\s*\(\s*(1k|[\d,]+)\s*\)/i);
    return match?.[1] ?? null;
  }

  function parseBookTotal(text) {
    const label = parseBookTotalLabel(text);
    if (label === null) return null;
    if (label.toLowerCase() === '1k') return 1000;
    const value = Number(label.replaceAll(',', ''));
    return Number.isSafeInteger(value) && value >= 0 ? value : null;
  }

  function parseProgressTotal(text) {
    return parseBookTotalLabel(text)?.toLowerCase() === '1k' ? 999 : parseBookTotal(text);
  }

  function computeStats({ loaded, matched, total }) {
    const count = Number.isSafeInteger(loaded) && loaded >= 0 ? loaded : 0;
    const visible = Number.isSafeInteger(matched) ? Math.min(count, Math.max(0, matched)) : 0;
    const validTotal = Number.isSafeInteger(total) && total >= count ? total : null;
    const current = Math.ceil(count / PAGE_SIZE);
    const pages = validTotal === null ? null : Math.ceil(validTotal / PAGE_SIZE);
    return {
      loaded: count,
      matched: visible,
      total: validTotal,
      pages,
      remaining: pages === null ? null : pages - current,
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
    return parseBookTotal(root.querySelector('.booklist-header__tabs tab')?.textContent) === 0 ||
      coexistenceNoticeMode(root, 'booklist') === 'detected';
  }

  function sameBooklistContainer(root, pathname, initialPathname, container) {
    return String(pathname || '') === initialPathname && !!container &&
      root.querySelector('.booklist-main.active') === container &&
      !!container.querySelector('.readlist-view');
  }

  function detectListPage(root, hostname, pathname) {
    const path = String(pathname || '');
    const host = String(hostname || '').toLowerCase();
    if (path.startsWith('/booklist/')) {
      const container = root.querySelector('.booklist-main.active');
      return container && hasBooklistFingerprint(root) ? { kind: 'booklist', container } : null;
    }
    if (!KNOWN_HOSTS.has(host)) return null;
    if (path === '/s' || path === '/s/') {
      const container = root.querySelector('#searchResultBox');
      return container ? { kind: 'search', container } : null;
    }
    if (path === '/users/zrecommended') {
      const container = root.querySelector('[class*="RecommendationBlock__EndlessMasonry"]');
      return container ? { kind: 'zrecommended', container } : null;
    }
    const source = path === '/popular' ? 'mostpopular'
      : path === '/' || path.startsWith('/book/') ? 'recommend' : null;
    if (!source) return null;
    const container = root.querySelector(`z-masonry[source="${source}"]`);
    if (!container) return null;
    return { kind: path === '/popular' ? 'popular'
      : path === '/' ? 'home-recommend' : 'detail-recommend', container };
  }

  function getPageEntries(root, kind) {
    const masonrySource = kind === 'popular' ? 'mostpopular'
      : kind === 'home-recommend' || kind === 'detail-recommend' ? 'recommend' : null;
    if (masonrySource) {
      const masonry = root.querySelector(`z-masonry[source="${masonrySource}"]`);
      if (masonry?.shadowRoot)
        return [...masonry.shadowRoot.querySelectorAll('a:has(> z-cover)')];
    }
    const selectors = {
      booklist: '.booklist-main.active .readlist-view > z-bookcard',
      search: '#searchResultBox .resItemBoxBooks > z-bookcard',
      'home-recommend': 'z-masonry[source="recommend"] > a:has(> z-cover)',
      'detail-recommend': 'z-masonry[source="recommend"] > a:has(> z-cover)',
      zrecommended: '[class*="RecommendationBlock__EndlessMasonry"] a.item:has(> z-cover)',
      popular: 'z-masonry[source="mostpopular"] > a:has(> z-cover)',
    };
    return selectors[kind] ? [...root.querySelectorAll(selectors[kind])] : [];
  }

  function setPageEntryHidden(entry, kind, hidden) {
    const target = kind === 'search' || (MASONRY_PAGE_KINDS.has(kind) && entry.parentElement?.classList?.contains('item'))
      ? entry.parentElement : entry;
    target?.classList?.toggle('zble-hidden', hidden);
  }

  function watchMasonryShadow(container, onChange, Observer = MutationObserver) {
    const root = container?.shadowRoot;
    if (!root) return null;
    const style = container.ownerDocument.createElement('style');
    style.id = 'zble-masonry-filter-style';
    style.textContent = '.item.zble-hidden,a.zble-hidden{display:none!important}';
    root.append(style);
    const observer = new Observer(() => {
      if (style.parentNode !== root) root.append(style);
      onChange();
    });
    observer.observe(root, { childList: true, subtree: true });
    return { dispose() { observer.disconnect(); style.remove(); } };
  }

  function ensureMasonryShadowWatch(kind, container, current, onChange, Observer = MutationObserver) {
    return current || (MASONRY_PAGE_KINDS.has(kind)
      ? watchMasonryShadow(container, onChange, Observer) : null);
  }

  function pageCapabilities(kind) {
    const booklist = kind === 'booklist';
    const search = kind === 'search';
    const supported = booklist || search;
    return { format: supported, size: supported, download: true, year: supported,
      information: booklist, booklistAutomation: booklist, bulkOpen: true };
  }

  function coexistenceNoticeMode(root, kind) {
    if (kind === 'home-recommend' || kind === 'zrecommended') return 'conditional';
    if (kind === 'booklist') return ['#plugin_copy_booklist', '#plugin_download_booklist', '#wrapLang']
      .some(selector => !!root.querySelector(selector)) ? 'detected' : 'none';
    if (kind === 'search') return getPageEntries(root, 'search').some(card =>
      !!card.shadowRoot?.querySelector('.icon-open-book-by-script')) ? 'detected' : 'none';
    return 'none';
  }

  function attachUiEnhanceButtonLinks(root, label, open, owned) {
    for (const selector of ['#plugin_copy_booklist', '#plugin_download_booklist']) {
      const anchor = root.querySelector(selector);
      if (!anchor) continue;
      let link = anchor.nextElementSibling;
      if (link?.dataset?.zbleCoexistence !== '1') {
        link = root.createElement('button');
        link.type = 'button';
        link.className = 'zble-ui-enhance-link';
        link.dataset.zbleCoexistence = '1';
        link.addEventListener('click', event => {
          event.preventDefault();
          event.stopPropagation();
          open(link);
        });
        anchor.after(link);
        owned.add(link);
      }
      if (link.textContent !== label) link.textContent = label;
    }
  }

  function effectiveSettings(settings, capabilities) {
    return { ...settings,
      filterFormat: capabilities.format && settings.filterFormat,
      filterSize: capabilities.size && settings.filterSize,
      filterDownload: capabilities.download && settings.filterDownload,
      filterYear: capabilities.year && settings.filterYear };
  }

  function applyPanelCapabilities(panel, kind, locale) {
    if (!panel) return;
    const capabilities = pageCapabilities(kind);
    for (const [name, suffix] of [['format', 'format'], ['size', 'size-filter'],
      ['download', 'download'], ['year', 'year-filter']]) {
      const supported = capabilities[name];
      const input = panel.querySelector(`#zble-${suffix}-switch`);
      if (input) {
        if (!supported) {
          input.disabled = true;
          input.checked = false;
        }
      }
      const configure = panel.querySelector(`#zble-configure-${name}`);
      if (configure) configure.disabled = !supported;
      if (!supported) {
        const summary = panel.querySelector(`#zble-${name}-summary`);
        if (summary) summary.textContent = `（${translate(locale, 'hint.siteMissing')}）`;
      }
    }
    const info = panel.querySelector('#zble-info-toggle');
    const infoBody = panel.querySelector('#zble-info-body');
    if (info) {
      info.disabled = !capabilities.information;
      if (!capabilities.information) info.setAttribute('aria-expanded', 'false');
    }
    if (infoBody && !capabilities.information) infoBody.hidden = true;
    const infoHint = panel.querySelector('#zble-info-availability');
    if (infoHint) infoHint.textContent = capabilities.information ? ''
      : `（${translate(locale, 'hint.booklistOnly')}）`;
    if (!capabilities.booklistAutomation) {
      for (const selector of ['#zble-show-more-1', '#zble-show-more-2',
        '#zble-show-more-continuous', '#zble-reset-show-more', '#zble-reset-hint',
        '#zble-show-more-status', '#zble-show-more-availability', '#zble-favorite',
        '#zble-show-more-count-1', '#zble-show-more-count-2',
        '#zble-show-more-error-1', '#zble-show-more-error-2',
        'label[for="zble-show-more-count-1"]', 'label[for="zble-show-more-count-2"]']) {
        const element = panel.querySelector(selector);
        if (element) element.hidden = true;
      }
      const continuous = panel.querySelector('#zble-allow-continuous');
      if (continuous?.parentElement) continuous.parentElement.hidden = true;
    }
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
    if (quietMs < 750) return 'wait';
    if (!buttonExists) return 'end';
    if (now - before >= PAGE_SIZE) return 'next';
    return quietMs >= 10000 ? 'timeout' : 'wait';
  }

  function classifyShowMoreIdle(idleMs) {
    if (idleMs >= 10000) return { phase: 'timeout', seconds: null };
    if (idleMs >= 5000) return { phase: 'warning', seconds: Math.max(1, Math.ceil((10000 - idleMs) / 1000)) };
    return { phase: 'running', seconds: null };
  }

  function formatShowMoreAction(locale, { maxClicks = 5, phase = null, seconds = null,
    attempted = 0, failed = 0, currentAttempted = 0 } = {}) {
    const action = maxClicks === null ? translate(locale, 'auto.continuous')
      : maxClicks === 1 ? translate(locale, 'auto.showMoreOne')
        : translate(locale, 'auto.showMore', { count: maxClicks });
    const clicked = Math.max(0, maxClicks === null ? currentAttempted : Math.min(maxClicks, currentAttempted));
    const detail = maxClicks === null ? translate(locale, 'auto.continuousProgress', { clicked })
      : translate(locale, 'auto.showMoreProgress', { clicked, remaining: maxClicks - clicked });
    const progress = locale.startsWith('zh') ? `${action}（${detail}）` : `${action} (${detail})`;
    if (phase === 'running') return translate(locale, 'auto.running', { action: progress });
    if (phase === 'warning') return translate(locale, 'auto.warning', { action: progress, seconds });
    if (failed > 0) return translate(locale, 'auto.clickedFailed', { action, attempted, failed });
    if (attempted > 0) return translate(locale, 'auto.clicked', { action, attempted });
    return action;
  }

  async function runShowMore({ maxClicks, getCards, findButton, observe, clock = {
    now: () => Date.now(), setTimeout: (callback, delay) => setTimeout(callback, delay),
    clearTimeout: id => clearTimeout(id),
  }, onProgress = () => {}, onAttempt = () => {}, isSourceAlive = () => true, signal = null }) {
    let completed = 0;
    let added = 0;
    let attempted = 0;
    let failed = 0;
    const result = reason => ({ completed, added, attempted, failed, reason });
    const abortReason = () => signal?.reason === 'user-stop' ? 'cancelled' : 'source-gone';
    for (let round = 0; maxClicks === null || round < maxClicks; round++) {
      if (signal?.aborted) return result(abortReason());
      if (!isSourceAlive()) return result('source-gone');
      const button = findButton();
      if (!button && attempted > 0) return result('end');
      if (isNativeShowMoreUnavailable(button)) return result('button-unavailable');
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
        function aborted() { finish(abortReason()); }
        function check() {
          if (finished) return;
          if (signal?.aborted) { finish(abortReason()); return; }
          if (!isSourceAlive()) { finish('source-gone'); return; }
          const now = clock.now();
          const newCount = getCards().filter(card => !beforeCards.has(card)).length;
          if (newCount > seenNew) { seenNew = newCount; changedAt = now; }
          const buttonExists = !!findButton();
          const quietMs = now - changedAt;
          const elapsedMs = now - startedAt;
          const state = classifyBatchProgress({ before: 0, now: newCount, buttonExists, quietMs, elapsedMs });
          if (state !== 'wait') { finish(state); return; }
          const idle = classifyShowMoreIdle(quietMs);
          onProgress({ ...result('running'), ...idle });
          if (timer !== null) clock.clearTimeout(timer);
          const untilDeadline = Math.max(1, (quietMs < 5000 ? 5000 : Math.min(10000, Math.ceil((quietMs + 1) / 1000) * 1000)) - quietMs);
          const untilQuiet = Math.max(1, 750 - quietMs);
          timer = clock.setTimeout(check, newCount >= PAGE_SIZE || !buttonExists
            ? Math.min(untilQuiet, untilDeadline) : untilDeadline);
        }
        try {
          unsubscribe = observe(check);
          signal?.addEventListener?.('abort', aborted, { once: true });
          onAttempt(button);
          attempted++;
          button.click();
          check();
        } catch (error) {
          console.error('Z-lib Booklist Enhancer: Show more task failed', error);
          finish('error');
        }
      });
      added += outcome.seenNew;
      if (outcome.reason === 'next' || outcome.reason === 'end') completed++;
      if (outcome.reason === 'timeout' || outcome.reason === 'error') failed++;
      onProgress({ ...result(outcome.reason), phase: outcome.reason === 'next' ? 'running' : null });
      if (outcome.reason !== 'next') return result(outcome.reason);
    }
    return result('complete');
  }

  function classifyListCompletion({ reason, loadedCount, expectedTotal }) {
    if (reason !== 'end') return { displayed: false, noticeKey: null };
    if (!Number.isSafeInteger(expectedTotal) || expectedTotal < 0)
      return { displayed: true, noticeKey: 'auto.showMoreCountUnknown' };
    return { displayed: true, noticeKey: Math.abs(loadedCount - expectedTotal) > 10
      ? 'auto.showMoreCountMismatch' : null };
  }

  function isNativeShowMoreDisabled(button) {
    return !!button && (button.disabled === true || button.getAttribute?.('aria-disabled') === 'true');
  }

  function isNativeShowMoreUnavailable(button) {
    if (!button || button.hidden || ('isConnected' in button && !button.isConnected) ||
        isNativeShowMoreDisabled(button) || button.style?.pointerEvents === 'none' ||
        (button.getClientRects && button.getClientRects().length === 0)) return true;
    try {
      if (typeof getComputedStyle !== 'function') return false;
      const style = getComputedStyle(button);
      return style.pointerEvents === 'none' || style.visibility === 'hidden' || style.visibility === 'collapse';
    }
    catch { return false; }
  }

  function showMoreControlState({ nativeButton = null, resetEligible = false, busy = false, bulkBusy = false }) {
    return { autoDisabled: busy || bulkBusy || isNativeShowMoreUnavailable(nativeButton),
      resetDisabled: busy || bulkBusy || !resetEligible };
  }

  function createShowMoreStallTracker({ clock = {
    now: () => Date.now(), setTimeout: (callback, delay) => setTimeout(callback, delay),
    clearTimeout: id => clearTimeout(id),
  }, getCards, getButton, onState = () => {} }) {
    let attempt = null;
    let timer = null;
    let disposed = false;
    function clearTimer() { if (timer !== null) clock.clearTimeout(timer); timer = null; }
    function check() {
      clearTimer();
      const button = getButton();
      if (disposed || !attempt || !button || button !== attempt.button || button.hidden ||
          ('isConnected' in button && !button.isConnected)) attempt = null;
      if (attempt) {
        const count = getCards().length;
        if (count > attempt.count) { attempt.count = count; attempt.changedAt = clock.now(); }
        if (isNativeShowMoreDisabled(button)) attempt.sawUnavailable = true;
        else if (attempt.sawUnavailable || clock.now() - attempt.changedAt >= 10000) attempt = null;
      }
      const idleMs = attempt ? Math.max(0, clock.now() - attempt.changedAt) : 0;
      const resetEligible = !!attempt && idleMs >= 10000 && isNativeShowMoreDisabled(button);
      const state = { resetEligible, idleMs, buttonUnavailable: isNativeShowMoreDisabled(button) };
      if (attempt && !resetEligible) timer = clock.setTimeout(check, Math.max(1, 10000 - idleMs));
      onState(state);
      return state;
    }
    function noteClick(button) {
      if (disposed || !button || button !== getButton() || isNativeShowMoreDisabled(button)) return;
      attempt = { button, count: getCards().length, changedAt: clock.now(), sawUnavailable: false,
        baseline: { disabled: button.disabled === true, ariaDisabled: button.getAttribute?.('aria-disabled') ?? null } };
      check();
    }
    return {
      noteManualClick: noteClick, noteToolClick: noteClick, check,
      baseline: () => attempt?.baseline ?? null,
      consumeReset() { attempt = null; check(); },
      dispose() { disposed = true; attempt = null; clearTimer(); },
    };
  }

  function attemptShowMoreReset({ button, baseline, stillEligible }) {
    if (!button || !baseline || !stillEligible()) return { attempted: false, interactive: false };
    if (baseline.disabled === false && button.disabled === true) button.disabled = false;
    if (button.getAttribute?.('aria-disabled') === 'true' && baseline.ariaDisabled !== 'true') {
      if (baseline.ariaDisabled === null) button.removeAttribute?.('aria-disabled');
      else button.setAttribute?.('aria-disabled', baseline.ariaDisabled);
    }
    return { attempted: true, interactive: !isNativeShowMoreUnavailable(button) };
  }

  function classifyResetVerification(pending, button, cardCount, buttonUnavailable) {
    if (!pending || button !== pending.button || cardCount > pending.cardCount) return 'clear';
    return buttonUnavailable ? 'failed' : 'pending';
  }

  function modalTabDestination(step, shiftKey, activeElement, cancel, confirm) {
    if (step === 0) return cancel;
    if (shiftKey && activeElement === cancel) return confirm;
    if (!shiftKey && activeElement === confirm) return cancel;
    return null;
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

  function bulkClickDecision({ enabled, gate, targetCount }) {
    if (!enabled) return 'enable-info';
    if (!gate.allowed) return 'blocked';
    return targetCount > 0 ? 'confirm' : 'empty';
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
      filesize: card.getAttribute('filesize') || '',
      coverId: cover?.getAttribute('id') || '',
      isbns: (cover?.getAttribute('isbn') || '').split(',').map(value => value.trim()).filter(Boolean),
      year: card.getAttribute('year'),
      language: card.getAttribute('language'),
    };
  }

  function readPageEntry(entry, kind) {
    if (kind === 'booklist' || kind === 'search') return readCardData(entry);
    const cover = entry.querySelector?.('z-cover');
    const ready = !!cover?.classList?.contains('ready') && !!cover.shadowRoot;
    return {
      coverId: cover?.getAttribute('id') || '',
      isbns: (cover?.getAttribute('isbn') || '').split(',').map(value => value.trim()).filter(Boolean),
      download: !ready ? 'unknown' : cover.shadowRoot.querySelector('.mark.downloaded')
        ? 'downloaded' : 'not-downloaded',
    };
  }

  function compileFilters(settings, downloadReady, lookup) {
    const selected = new Set(settings.formats);
    const sizeBands = new Set(settings.sizeBands);
    const custom = parseCustomFormats(settings.custom);
    const yearRule = parseYearRule(settings);
    return {
      selected,
      custom,
      formatActive: settings.filterFormat && hasEffectiveFormatRule(selected, custom),
      sizeBands,
      sizeActive: settings.filterSize && sizeBands.size > 0,
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
    const sizeOk = !context.sizeActive || context.sizeBands.has(classifyFileSize(info.filesize));
    const download = context.downloadActive ? classifyDownload({
      ready: context.downloadReady,
      coverId: info.coverId,
      isbns: info.isbns,
      lookup: context.lookup,
    }) : 'unknown';
    const downloadOk = !context.downloadActive || download === 'unknown' ||
      (context.downloadRule === 'downloaded' ? download === 'downloaded' : download === 'not-downloaded');
    const yearOk = !context.yearActive || matchesYear(info.year, context.yearRule, context.includeMissingYear);
    return { visible: formatOk && sizeOk && downloadOk && yearOk, download };
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

  function filterPageEntries(entries, kind, context) {
    const infos = [];
    const results = [];
    let matched = 0;
    for (const entry of entries) {
      const info = readPageEntry(entry, kind);
      const result = kind === 'booklist' || kind === 'search' ? evaluateCard(info, context) : {
        visible: !context.downloadActive || info.download === 'unknown' ||
          info.download === context.downloadRule,
        download: info.download,
      };
      infos.push(info);
      results.push(result);
      if (result.visible) matched++;
    }
    return { entries, infos, results, matched };
  }

  function mutationNeedsRefresh(records) {
    const toolNode = node => node?.classList?.contains('zble-summary-card') ||
      node?.classList?.contains('zble-progress');
    return records.some(record => {
      if (record.type !== 'childList') return !toolNode(record.target) &&
        !record.target.closest?.('.zble-summary-card, .zble-progress');
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
    const size = wrap(settings.sizeBands.length
      ? settings.sizeBands.map(band => translate(locale, `setting.size.${band}`)).join(zh ? '、' : ', ')
      : translate(locale, 'rule.manual'));
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
    return { format, size, download, year };
  }

  const summaryMessageCache = new WeakMap();

  function renderFilterSummary(list, stats, active, notices = [], cardMetrics = null, locale = 'zh-CN', totalLabel = null) {
    if (!list) return;
    let summary = list.querySelector('.zble-summary-card');
    if (!active) { summary?.remove(); return; }
    if (!summary) {
      summary = list.ownerDocument.createElement('div');
      summary.className = 'zble-summary-card';
      summary.setAttribute?.('role', 'status');
      list.append(summary);
    }
    const siteTotal = totalLabel ?? (stats.total === null ? null : new Intl.NumberFormat(locale).format(stats.total));
    const total = siteTotal === null ? translate(locale, 'summary.unknown') : siteTotal;
    const unit = locale.startsWith('zh') ? ' 本' : '';
    const totalUnit = siteTotal === null ? '' : unit;
    const message = `${translate(locale, 'summary.loaded')} ${stats.loaded}${unit}\n${translate(locale, 'summary.matched')} ${stats.matched}${unit}\n${translate(locale, 'summary.total')} ${total}${totalUnit}`;
    const next = notices.length ? `${message}\n${notices.join(locale.startsWith('zh') ? '；' : '; ')}` : message;
    if (summaryMessageCache.get(summary) !== next) {
      if (typeof summary.replaceChildren === 'function') {
        const values = [stats.loaded, stats.matched, siteTotal];
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
            : `${index === 2 ? values[index] : new Intl.NumberFormat(locale).format(values[index])}${unit}`;
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
      for (const [key, value] of Object.entries({ height: `${cardMetrics.height}px`,
        width: `${cardMetrics.width}px`, margin: cardMetrics.margin })) {
        if (summary.style[key] !== value) summary.style[key] = value;
      }
    }
    if (list.children[list.children.length - 1] !== summary) list.append(summary);
  }

  function formatProgressText(stats, locale = 'zh-CN') {
    const remaining = stats.remaining === null ? translate(locale, 'summary.unknown') : stats.remaining;
    const pages = stats.pages === null ? translate(locale, 'summary.unknown') : stats.pages;
    if (stats.loaded === 0) return translate(locale, stats.pages === null ? 'progress.zeroUnknown' : 'progress.zero',
      { remaining, pages });
    if (stats.pages === null || stats.remaining === null) return translate(locale, 'progress.unknown',
      { expansions: stats.approxExpansions, current: stats.current });
    return translate(locale, 'progress.text', { expansions: stats.approxExpansions,
      current: stats.current, remaining, pages });
  }

  function renderShowMore(main, stats, locale = 'zh-CN', enabled = true) {
    const more = main?.querySelector('.page-load-more');
    if (!more) return;
    let progress = more.querySelector('.zble-progress');
    if (!enabled) { progress?.remove(); return; }
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

  function bindSectionToggle(button, body, initiallyExpanded, onToggle = () => {}) {
    let expanded = !!initiallyExpanded;
    function render() {
      body.hidden = !expanded;
      button.setAttribute('aria-expanded', String(expanded));
    }
    button.addEventListener('click', () => {
      expanded = !expanded;
      render();
      onToggle();
    });
    render();
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

  function parseFileSizeMb(raw) {
    const match = String(raw ?? '').trim().match(/^([\d]+(?:[.,]\d+)?)\s*(B|KB|MB|GB|TB)$/i);
    if (!match) return null;
    const value = Number(match[1].replace(',', '.'));
    const factor = { B: 1 / 1048576, KB: 1 / 1024, MB: 1, GB: 1024, TB: 1048576 }[match[2].toUpperCase()];
    return Number.isFinite(value) && value >= 0 ? value * factor : null;
  }

  function classifyFileSize(raw) {
    const sizeMb = parseFileSizeMb(raw);
    if (sizeMb === null) return 'unknown';
    if (sizeMb < 1) return 'lt1';
    if (sizeMb < 10) return '1to10';
    if (sizeMb < 50) return '10to50';
    if (sizeMb < 100) return '50to100';
    return 'gte100';
  }

  function renderFormatBadge(card, extension, show, locale = 'zh-CN', rawSize = '', showSize = false) {
    const cover = card.shadowRoot?.querySelector('z-cover');
    const root = cover?.shadowRoot;
    if (!root) return false;
    let style = root.querySelector('#zble-badge-style');
    if (!style) {
      style = card.ownerDocument.createElement('style');
      style.id = 'zble-badge-style';
      style.textContent = ':host{position:relative}.zble-format,.zble-size{position:absolute;z-index:10;left:8px;top:8px;display:inline-block;max-width:calc(100% - 16px);padding:2px 6px;border-radius:4px;color:#fff;font:700 11px/1.5 system-ui,sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;pointer-events:none;box-shadow:0 1px 3px #0005}.zble-format{background:#245e9b}.zble-size--tiny{background:#18794e}.zble-size--small{background:#e5bc26;color:#342600}.zble-size--medium{background:#d66a1f}.zble-size--large{background:#b42318}.zble-size--huge{background:#7836b7}.zble-size--stacked{top:32px}@media(forced-colors:active){.zble-format,.zble-size{background:Canvas;color:CanvasText;border:1px solid CanvasText;box-shadow:none}}';
      root.append(style);
    }
    const sizeMb = parseFileSizeMb(rawSize);
    const sizeColor = { lt1: 'tiny', '1to10': 'small', '10to50': 'medium',
      '50to100': 'large', gte100: 'huge' }[classifyFileSize(rawSize)] || 'tiny';
    const badges = [
      ['.zble-format', !!show, extension ? extension.toUpperCase() : translate(locale, 'hint.unknownFormat'), 'zble-format'],
      ['.zble-size', !!showSize && sizeMb !== null, String(rawSize).trim(),
        `zble-size zble-size--${sizeColor}${show ? ' zble-size--stacked' : ''}`],
    ];
    for (const [selector, visible, label, className] of badges) {
      let badge = root.querySelector(selector);
      if (!visible) { badge?.remove(); continue; }
      if (!badge) {
        badge = card.ownerDocument.createElement('span');
        root.append(badge);
      }
      if (badge.className !== className) badge.className = className;
      if (badge.textContent !== label) badge.textContent = label;
    }
    card.toggleAttribute('data-zble-show-format', !!show);
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
      style.textContent = ':host([data-zble-full-author]) .book-info{height:auto!important;min-height:88px;overflow:visible!important}:host([data-zble-full-author]) .book-info .author,:host([data-zble-full-author]) .book-info .authors,:host([data-zble-full-author]) .book-info .book-author{height:auto!important;max-height:none!important;overflow:visible!important;-webkit-line-clamp:unset!important;display:block!important;white-space:normal!important}';
      root.append(style);
    }
    card.toggleAttribute('data-zble-full-author', !!enabled);
    return true;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      normalizeExtension, parseCustomFormats, invalidCustomFormats, matchesFormat, hasEffectiveFormatRule,
      sanitizeSettings, parseShowMoreCount, describeShowMoreCountInput,
      parseBookTotal, parseBookTotalLabel, parseProgressTotal, computeStats, classifyDownload, createDownloadGate,
      getActiveCards, hasBooklistFingerprint, sameBooklistContainer,
      detectListPage, getPageEntries, setPageEntryHidden,
      watchMasonryShadow, ensureMasonryShadowWatch,
      pageCapabilities, effectiveSettings, applyPanelCapabilities, coexistenceNoticeMode,
      attachUiEnhanceButtonLinks,
      readCardData, readPageEntry, compileFilters, evaluateCard, filterActiveCards, filterPageEntries,
      createRefreshScheduler, createPanelResizeHandler, mutationNeedsRefresh,
      renderFormatBadge, parseFileSizeMb, classifyFileSize, renderCardMeta, renderFullTitle, renderFullAuthor,
      formatRuleSummary, bindDeferredTextInput,
      renderFilterSummary, renderShowMore, formatProgressText,
      snapPanelPosition, clampPanelPosition, resetPanelDock, canStartPanelDrag, createPanelHeaderToggle,
      parseYearRule, matchesYear,
      resolveLocale, translate, sanitizeSitePrefs, TRANSLATION_KEYS, TRANSLATIONS,
      createExclusiveDisclosure, bindSectionToggle,
      classifyPage, noticeRemainingSeconds, shouldShowNotice, classifyBatchProgress,
      classifyShowMoreIdle, formatShowMoreAction, runShowMore, classifyListCompletion,
      createShowMoreStallTracker, attemptShowMoreReset, classifyResetVerification,
      modalTabDestination, showMoreControlState,
      collectOpenTargets, canOpenAll, bulkClickDecision, confirmBulkOpen, runOpenAll,
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
      const page = detectListPage(document, location.hostname, pathname);
      const waitingForList = pathname.startsWith('/booklist/') || KNOWN_HOSTS.has(location.hostname?.toLowerCase()) &&
        (['/', '/s', '/s/', '/popular', '/users/zrecommended'].includes(pathname) || pathname.startsWith('/book/'));
      const kind = page?.kind || classifyPage(location.hostname, pathname, false);
      if (!page && currentRoute?.kind === 'booklist' &&
          sameBooklistContainer(document, pathname, currentRoute.pathname, currentRoute.container)) return;
      if (currentRoute && currentRoute.kind === kind && currentRoute.pathname === pathname &&
          (!page || currentRoute.container === page.container)) return;
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
      } else if (page) {
        const instance = activate(startRoute, page);
        currentRoute = { kind, pathname, container: page.container, dispose: () => instance.dispose() };
      } else if (kind === 'notice') {
        const host = location.hostname.toLowerCase();
        const prefs = loadSitePrefs();
        let notice = null;
        let observer = null;
        let timeoutId = null;
        if (waitingForList && document.documentElement) {
          observer = new MutationObserver(startRoute);
          observer.observe(document.documentElement, { childList: true, subtree: true });
          timeoutId = setTimeout(() => observer.disconnect(), 30000);
        }
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
              prefs[host] = { welcomeEnabled: false, bulkOpenEnabled: prefs[host]?.bulkOpenEnabled === true,
                continuousEnabled: prefs[host]?.continuousEnabled === true };
              saveSitePrefs(prefs);
            } });
        }
        currentRoute = { kind, pathname, dispose() {
          observer?.disconnect(); clearTimeout(timeoutId); notice?.dispose();
        } };
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

    function activate(onStale, page) {
    const STORAGE_KEY = 'zble-settings-v2';
    const pageKind = page.kind;
    const capabilities = pageCapabilities(pageKind);
    const initialPathname = window.location?.pathname || '/booklist/';
    const initialMain = pageKind === 'booklist' ? page.container : null;
    const initialContainer = page.container;
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
    let masonryWatch = null;
    let parentObserver = null;
    let startupObserver = null;
    let classObservers = [];
    const coverObservers = new Map();
    const coexistenceLinks = new Set();
    const coexistenceDismissKey = 'zble-ui-enhance-warning-dismissed-v1';
    let coexistenceDismissed = false;
    try { coexistenceDismissed = window.sessionStorage?.getItem(coexistenceDismissKey) === '1'; }
    catch { /* Keep dismissal within this document when storage is blocked. */ }
    let coexistenceDialogHost = null;
    let searchCoexistenceTimer = null;
    let lastCardMetrics = null;
    let panelResize = null;
    let disposed = false;
    let lastPanelData = null;
    let showMoreTask = null;
    let showMoreController = null;
    let activeShowMoreId = null;
    let activeShowMoreLimit = null;
    let showMoreDialogPending = false;
    let showMoreBusy = false;
    let showMoreTracker = null;
    let stallState = { resetEligible: false };
    let autoStatus = null;
    let autoLastFailed = false;
    let bulkBusy = false;
    let bulkStatus = null;
    let bulkLastFailed = false;
    let bulkMessageKey = '';
    let resetMessageKey = '';
    let resetVerification = null;
    let resetDialogFailure = null;
    let pendingResetFailureDialog = false;
    let bulkDialogPromise = null;
    let refreshAutomationDialog = null;
    let hasOpenedOnThisPage = false;
    const automationAbort = new AbortController();

    function isCurrentRoute() {
      if (disposed) return false;
      if (pageKind === 'booklist') return sameBooklistContainer(document,
        window.location?.pathname || '/booklist/', initialPathname, initialContainer);
      return (window.location?.pathname || '/booklist/') === initialPathname &&
        detectListPage(document, window.location?.hostname, initialPathname)?.container === initialContainer;
    }

    function isCurrentBooklist() {
      return pageKind === 'booklist' && isCurrentRoute();
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
      input.disabled = capabilities.format && gate.state !== 'ready';
      panelRoot.querySelector('#zble-wait-icon').hidden = !capabilities.format || gate.state !== 'waiting';
      panelRoot.querySelector('#zble-warn-icon').hidden = !capabilities.format ||
        !['timed-out', 'failed'].includes(gate.state);
    }

    function renderPanelState(context, unknownCards, unavailable) {
      const summaries = formatRuleSummary(settings, gate.state, context.yearRule, locale);
      for (const name of ['format', 'size', 'download', 'year']) {
        setText(`#zble-${name}-summary`, summaries[name]);
      }
      setText('#zble-format-hint', settings.filterFormat && !context.formatActive
        ? translate(locale, 'hint.formatEmpty')
        : invalidCustomFormats(settings.custom).length ? translate(locale, 'hint.invalidCustom') : '');
      setText('#zble-size-hint', settings.filterSize && !context.sizeActive
        ? translate(locale, 'hint.sizeEmpty') : '');
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
      applyPanelCapabilities(panelRoot, pageKind, locale);
    }

    function translatedNotices(context) {
      const notices = [];
      if (settings.filterFormat && !context.formatActive) notices.push(translate(locale, 'hint.formatPending'));
      if (settings.filterSize && !context.sizeActive) notices.push(translate(locale, 'hint.sizePending'));
      if (settings.filterDownload && gate.state !== 'ready') notices.push(translate(locale, 'hint.downloadPaused'));
      if (settings.filterYear && !context.yearActive) notices.push(translate(locale,
        context.yearRule.error ? 'rule.conflict' : 'hint.yearPending'));
      return notices;
    }

    function renderAutoStatus() {
      if (!panelRoot) return;
      const descriptions = [1, 2].map(index => {
        const input = panelRoot.querySelector(`#zble-show-more-count-${index}`);
        const value = describeShowMoreCountInput(locale, input.value, index === 1 ? 5 : 10);
        setText(`#zble-show-more-error-${index}`, value.error);
        input.setAttribute('aria-invalid', String(!!value.error));
        return value;
      });
      for (const [index, id] of [1, 2, 'continuous'].entries()) {
        const button = panelRoot.querySelector(`#zble-show-more-${id}`);
        const running = activeShowMoreId === id && showMoreBusy;
        const label = id === 'continuous' ? translate(locale, 'auto.continuous') : descriptions[index].label;
        button.textContent = running
          ? `${formatShowMoreAction(locale, { maxClicks: activeShowMoreLimit,
            phase: autoStatus?.phase || 'running', seconds: autoStatus?.seconds,
            currentAttempted: autoStatus?.attempted ?? 0 })} · ${translate(locale, 'auto.stop')}`
          : label;
        button.dataset.state = running ? 'running' : activeShowMoreId === id && autoLastFailed ? 'failed' : '';
      }
      const reason = autoStatus?.reason;
      const messageKey = reason === 'end' ? 'auto.showMoreEnd'
        : reason === 'cancelled' ? 'auto.cancelled'
          : reason === 'timeout' ? 'auto.showMoreTimeout'
            : reason === 'button-unavailable' ? 'auto.showMoreUnavailable'
              : ['error', 'source-gone'].includes(reason) ? 'auto.showMoreError' : '';
      const message = autoStatus?.noticeKey
        ? translate(locale, autoStatus.noticeKey, autoStatus) : messageKey ? translate(locale, messageKey)
          : reason === 'complete' ? formatShowMoreAction(locale, { maxClicks: activeShowMoreLimit,
            attempted: autoStatus.attempted, failed: autoStatus.failed }) : '';
      panelRoot.querySelector('#zble-show-more-status').classList.toggle('error', !!autoStatus?.noticeKey);
      setText('#zble-show-more-status', message);
    }

    function syncShowMoreControls() {
      if (!panelRoot) return;
      const nativeButton = isCurrentBooklist() ? initialMain?.querySelector('.page-load-more') : null;
      const state = showMoreControlState({ nativeButton,
        resetEligible: stallState.resetEligible, busy: showMoreBusy || !!bulkDialogPromise, bulkBusy });
      setText('#zble-show-more-availability', !showMoreBusy && isCurrentBooklist() &&
        isNativeShowMoreUnavailable(nativeButton)
        ? translate(locale, 'auto.showMoreUnavailable') : '');
      for (const id of [1, 2, 'continuous']) {
        const button = panelRoot.querySelector(`#zble-show-more-${id}`);
        button.disabled = showMoreBusy ? activeShowMoreId !== id
          : bulkBusy || showMoreDialogPending || !!bulkDialogPromise || !isCurrentBooklist() ||
            (id !== 'continuous' || sitePrefs[currentHost]?.continuousEnabled === true) && state.autoDisabled;
      }
      panelRoot.querySelector('#zble-reset-show-more').disabled = state.resetDisabled;
    }

    function onNativeShowMoreClick(event) {
      if (!event.isTrusted || !isCurrentBooklist()) return;
      const button = event.target?.closest?.('.page-load-more');
      if (button && button === initialMain?.querySelector('.page-load-more')) {
        resetVerification = null;
        resetMessageKey = '';
        setText('#zble-reset-hint', '');
        showMoreTracker?.noteManualClick(button);
      }
    }

    function isCardSiteVisible(card) {
      if (!card.getClientRects?.().length) return false;
      const style = getComputedStyle(card);
      return style.display !== 'none' && style.visibility !== 'hidden';
    }

    function currentOpenTargets() {
      if (!isCurrentRoute()) return [];
      return collectOpenTargets(getPageEntries(document, pageKind), window.location.origin, isCardSiteVisible);
    }

    function currentFilterSignature() {
      return JSON.stringify({ filterFormat: settings.filterFormat, formats: settings.formats,
        custom: settings.custom, filterSize: settings.filterSize, sizeBands: settings.sizeBands,
        filterDownload: settings.filterDownload, downloadRule: settings.downloadRule,
        filterYear: settings.filterYear, yearMin: settings.yearMin, yearMax: settings.yearMax,
        includeMissingYear: settings.includeMissingYear, downloadState: gate.state });
    }

    function currentBulkGate() {
      const context = lastPanelData?.context;
      const active = effectiveSettings(settings, capabilities);
      const filtersReady = !!context && (!active.filterFormat || context.formatActive) &&
        (!active.filterSize || context.sizeActive) &&
        (!active.filterYear || context.yearActive) &&
        (!active.filterDownload || !capabilities.format || gate.state === 'ready');
      return canOpenAll({ enabled: sitePrefs[currentHost]?.bulkOpenEnabled === true,
        filtersReady, unknownDownloads: lastPanelData?.unknownCards || 0,
        openTabAvailable: typeof GM_openInTab === 'function' });
    }

    function syncBulkControl() {
      const button = panelRoot?.querySelector('#zble-open-all');
      if (!button) return;
      const gateResult = currentBulkGate();
      const targets = gateResult.allowed ? currentOpenTargets() : [];
      button.disabled = bulkBusy || showMoreBusy || !!showMoreTask || showMoreDialogPending || !isCurrentRoute();
      button.dataset.state = bulkBusy ? 'running' : bulkLastFailed ? 'failed' : '';
      const reasons = { disabled: 'auto.bulkDisabled', 'api-unavailable': 'auto.bulkApi',
        'filters-pending': 'auto.bulkFilters', 'unknown-downloads': 'auto.bulkUnknown' };
      setText('#zble-open-hint', gateResult.allowed
        ? (targets.length ? '' : translate(locale, 'auto.bulkEmpty'))
        : gateResult.reason === 'disabled' ? '' : translate(locale, reasons[gateResult.reason]));
    }

    function renderBulkStatus() {
      setText('#zble-open-status', bulkMessageKey ? translate(locale, bulkMessageKey)
        : bulkStatus ? translate(locale, 'auto.bulkProgress', bulkStatus) : '');
    }

    function showAutomationDialog(action, step, { count = 0, repeat = false } = {}) {
      if (bulkDialogPromise) {
        if (action === 'reset' && step === 1) {
          if (resetDialogFailure !== null) {
            resetDialogFailure = true;
            refreshAutomationDialog?.();
          } else pendingResetFailureDialog = true;
        }
        return bulkDialogPromise;
      }
      if (action === 'reset') resetDialogFailure = step === 1;
      bulkDialogPromise = new Promise(resolve => {
        if (automationAbort.signal.aborted || !isCurrentRoute()) { resolve(false); return; }
        const previousFocus = panelRoot?.activeElement || document.activeElement;
        const host = document.createElement('div');
        host.id = 'zble-bulk-dialog-host';
        const root = host.attachShadow({ mode: 'open' });
        root.innerHTML = `<style>
          :host{all:initial;position:fixed;inset:0;z-index:2147483002;display:grid;place-items:center;padding:16px;background:#0008;font:15px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif;color-scheme:light}
          *{box-sizing:border-box}[hidden]{display:none!important}.dialog{width:min(440px,100%);max-height:calc(100vh - 32px);overflow:auto;padding:20px;border:2px solid #347aad;border-radius:10px;background:#fff;color:#172534;box-shadow:0 12px 36px #0006;overflow-wrap:anywhere}
          h2{font-size:17px;margin:0 0 12px}p{margin:0 0 18px}.actions{display:flex;justify-content:flex-end;flex-wrap:wrap;gap:8px}button{font:inherit;padding:7px 12px;border:1px solid #6b99bc;border-radius:6px;background:#f0f6fb;color:#143a59;cursor:pointer}button:last-child{background:#1667a7;color:#fff;border-color:#1667a7}button:focus-visible{outline:3px solid #4da3ea;outline-offset:2px}
          @media(prefers-color-scheme:dark){:host{color-scheme:dark}.dialog{background:#1b2430;color:#eef3f8;border-color:#74b4e7}button{background:#263d50;color:#eef3f8;border-color:#78a5c6}button:last-child{background:#1b6a9c}}
          @media(forced-colors:active){.dialog{border-color:Highlight;box-shadow:none}button:focus-visible{outline-color:Highlight}}
        </style><div class="dialog" role="dialog" aria-modal="true" aria-labelledby="zble-bulk-title" aria-describedby="zble-bulk-message"><h2 id="zble-bulk-title"></h2><p id="zble-bulk-message"></p><div class="actions"><button id="zble-bulk-cancel" type="button"></button><button id="zble-bulk-confirm" type="button"></button></div></div>`;
        const cancel = root.querySelector('#zble-bulk-cancel');
        const confirm = root.querySelector('#zble-bulk-confirm');
        function renderDialog() {
          root.querySelector('#zble-bulk-title').textContent = translate(locale,
            action === 'reset' ? 'auto.resetShowMore'
              : action === 'continuous' ? 'auto.continuous' : 'auto.openAll');
          root.querySelector('#zble-bulk-message').textContent = action === 'continuous'
            ? translate(locale, step === 0 ? 'auto.continuousDisabled' : 'auto.continuousWarning')
            : action === 'reset' ? translate(locale, resetDialogFailure ? 'auto.resetFailed' : 'auto.resetCaution')
              : step === 0 ? translate(locale, 'auto.bulkDisabled') : step === 1
              ? `${translate(locale, 'auto.firstWarning', { count })}${repeat ? `\n${translate(locale, 'auto.repeatWarning', { count })}` : ''}`
              : translate(locale, 'auto.secondWarning');
          cancel.textContent = translate(locale, action === 'reset' || step === 0 ? 'auto.close' : 'auto.cancel');
          confirm.hidden = action === 'reset' || step === 0;
          confirm.textContent = translate(locale, 'auto.continue');
        }
        refreshAutomationDialog = renderDialog;
        renderDialog();
        document.body.append(host);
        let settled = false;
        function finish(value) {
          if (settled) return;
          settled = true;
          automationAbort.signal.removeEventListener('abort', abort);
          host.remove();
          previousFocus?.focus?.();
          bulkDialogPromise = null;
          refreshAutomationDialog = null;
          resetDialogFailure = null;
          const showPendingResetFailure = pendingResetFailureDialog;
          pendingResetFailureDialog = false;
          resolve(value);
          syncShowMoreControls();
          if (showPendingResetFailure && !disposed) void showAutomationDialog('reset', 1);
        }
        function abort() { finish(false); }
        cancel.addEventListener('click', () => finish(false));
        confirm.addEventListener('click', () => finish(true));
        root.addEventListener('keydown', event => {
          if (event.key === 'Escape') { event.preventDefault(); finish(false); }
          if (event.key === 'Tab') {
            const next = modalTabDestination(action === 'reset' ? 0 : step,
              event.shiftKey, root.activeElement, cancel, confirm);
            if (next) { event.preventDefault(); next.focus(); }
          }
        });
        automationAbort.signal.addEventListener('abort', abort, { once: true });
        cancel.focus();
      });
      syncShowMoreControls();
      return bulkDialogPromise;
    }

    function showBulkDialog(step, data) { return showAutomationDialog('bulk', step, data); }

    function showCoexistenceDialog(trigger) {
      if (coexistenceDialogHost || disposed || !isCurrentRoute()) return;
      const previousFocus = trigger || panelRoot?.activeElement || document.activeElement;
      const host = document.createElement('div');
      host.id = 'zble-coexistence-dialog-host';
      const root = host.attachShadow({ mode: 'open' });
      root.innerHTML = `<style>
        :host{all:initial;position:fixed;inset:0;z-index:2147483003;display:grid;place-items:center;padding:16px;background:#0009;font:14px/1.55 system-ui,-apple-system,"Segoe UI",sans-serif;color-scheme:light}
        *{box-sizing:border-box}.dialog{width:min(600px,100%);max-height:calc(100vh - 32px);overflow:auto;padding:20px;border:2px solid #a33d32;border-radius:10px;background:#fff;color:#172534;box-shadow:0 12px 36px #0006;overflow-wrap:anywhere}h2{font-size:18px;margin:0 0 10px}p{margin:8px 0}li{margin:8px 0}.signature{border-top:1px solid #b5c0ca;padding-top:10px}.actions{text-align:right}button{font:inherit;padding:6px 14px;border:1px solid #7e9bb0;border-radius:6px;background:#eef5fb;color:#173950;cursor:pointer}button:focus-visible{outline:3px solid #1878bd;outline-offset:2px}
        @media(prefers-color-scheme:dark){:host{color-scheme:dark}.dialog{background:#1b2430;color:#eef3f8;border-color:#e28f83}button{background:#294357;color:#eef3f8;border-color:#759ab4}}
        @media(forced-colors:active){.dialog{border-color:Highlight;box-shadow:none}}
      </style><div class="dialog" role="dialog" aria-modal="true" aria-labelledby="zble-coexistence-title"><h2 id="zble-coexistence-title"></h2><p id="zble-coexistence-intro"></p><ul id="zble-coexistence-list"></ul><p class="signature" id="zble-coexistence-signature"></p><div class="actions"><button id="zble-coexistence-close" type="button"></button></div></div>`;
      root.querySelector('#zble-coexistence-title').textContent = translate(locale, 'coexist.title');
      root.querySelector('#zble-coexistence-intro').textContent = translate(locale, 'coexist.intro');
      const list = root.querySelector('#zble-coexistence-list');
      for (const key of ['coexist.booklist', 'coexist.recommend', 'coexist.search',
        'coexist.download', 'coexist.actions']) {
        const item = document.createElement('li');
        item.textContent = translate(locale, key);
        list.append(item);
      }
      root.querySelector('#zble-coexistence-signature').textContent = translate(locale, 'coexist.signature');
      const close = root.querySelector('#zble-coexistence-close');
      close.textContent = translate(locale, 'coexist.close');
      function finish() {
        if (coexistenceDialogHost !== host) return;
        automationAbort.signal.removeEventListener('abort', finish);
        coexistenceDialogHost = null;
        host.remove();
        previousFocus?.focus?.();
      }
      close.addEventListener('click', finish);
      root.addEventListener('keydown', event => {
        if (event.key === 'Escape') { event.preventDefault(); finish(); }
        else if (event.key === 'Tab') { event.preventDefault(); close.focus(); }
      });
      automationAbort.signal.addEventListener('abort', finish, { once: true });
      document.body.append(host);
      coexistenceDialogHost = host;
      close.focus();
    }

    function refreshCoexistence() {
      if (!panelRoot || disposed) return;
      const mode = coexistenceNoticeMode(document, pageKind);
      const notice = panelRoot.querySelector('#zble-coexistence-notice');
      notice.hidden = mode === 'none' || coexistenceDismissed;
      if (!notice.hidden) {
        const beforeSpace = ' ';
        const afterText = translate(locale,
          mode === 'detected' ? 'coexist.detectedAfter' : 'coexist.conditionalAfter');
        const afterSpace = ['zh-CN', 'zh-TW', 'ja', 'ko'].includes(locale) || /^[.,。]/.test(afterText)
          ? '' : ' ';
        panelRoot.querySelector('#zble-coexistence-before').textContent =
          translate(locale, mode === 'detected' ? 'coexist.detectedBefore' : 'coexist.conditionalBefore') +
          beforeSpace;
        panelRoot.querySelector('#zble-coexistence-script').textContent = translate(locale, 'coexist.script');
        panelRoot.querySelector('#zble-coexistence-after').textContent = afterSpace + afterText;
        panelRoot.querySelector('#zble-coexistence-details').textContent = translate(locale, 'coexist.details');
        panelRoot.querySelector('#zble-coexistence-dismiss').setAttribute('aria-label',
          translate(locale, 'coexist.dismiss'));
      }
      if (pageKind === 'booklist') attachUiEnhanceButtonLinks(document,
        translate(locale, 'coexist.link'), showCoexistenceDialog, coexistenceLinks);
    }

    function refreshPanelLocale(nextLocale = locale) {
      locale = nextLocale;
      if (!panelRoot) return;
      refreshCoexistence();
      for (const node of panelRoot.querySelectorAll('[data-i18n]')) {
        const value = translate(locale, node.dataset.i18n);
        if (node.textContent !== value) node.textContent = value;
      }
      for (const card of pageKind === 'booklist' ? getActiveCards(document) : [])
        renderFormatBadge(card, normalizeExtension(card.getAttribute('extension')), settings.showFormat,
          locale, card.getAttribute('filesize'), settings.showSize);
      const gear = panelRoot.querySelector('#zble-gear');
      const collapse = panelRoot.querySelector('#zble-collapse');
      for (const [node, key] of [[gear, 'action.globalSettings'],
        [collapse, panelRoot.querySelector('#zble-content').hidden ? 'action.expand' : 'action.collapse'],
        [panelRoot.querySelector('#zble-wait-icon'), 'action.waitDownload'],
        [panelRoot.querySelector('#zble-warn-icon'), 'action.downloadUnconfirmed']]) {
        node?.setAttribute('aria-label', translate(locale, key));
        if (node === gear || node === collapse) node?.setAttribute('title', translate(locale, key));
      }
      for (const [name, key] of [['format', 'action.configureFormat'], ['size', 'action.configureSize'],
        ['download', 'action.configureDownload'], ['year', 'action.configureYear']]) {
        const control = panelRoot.querySelector(`#zble-configure-${name}`);
        control?.setAttribute('aria-label', translate(locale, key));
        control?.setAttribute('title', translate(locale, key));
      }
      const automationControl = panelRoot.querySelector('#zble-configure-automation');
      automationControl?.setAttribute('aria-label', translate(locale, 'action.configureAutomation'));
      automationControl?.setAttribute('title', translate(locale, 'action.configureAutomation'));
      for (const [selector, key] of [['#zble-custom', 'setting.custom'], ['#zble-year-min', 'setting.minYear'],
        ['#zble-year-max', 'setting.maxYear']]) panelRoot.querySelector(selector)?.setAttribute('aria-label', translate(locale, key));
      panelRoot.querySelector('#zble-custom')?.setAttribute('placeholder', translate(locale, 'setting.customPlaceholder'));
      for (const selector of ['#zble-year-min', '#zble-year-max'])
        panelRoot.querySelector(selector)?.setAttribute('placeholder', translate(locale, 'setting.yearPlaceholder'));
      if (lastPanelData) {
        const { context, unknownCards, unavailable, stats, activeFilter, list, main, totalLabel } = lastPanelData;
        renderPanelState(context, unknownCards, unavailable);
        if (pageKind === 'booklist') {
          renderFilterSummary(list, stats, activeFilter && settings.showSummary,
            translatedNotices(context), lastCardMetrics, locale, totalLabel);
          renderShowMore(main, stats, locale, settings.showProgress);
        } else if (!capabilities.format) {
          setText('#zble-download-summary', formatRuleSummary(settings, 'ready', context.yearRule, locale).download);
          setText('#zble-download-hint', '');
        }
      }
      renderAutoStatus();
      refreshAutomationDialog?.();
      setText('#zble-reset-hint', resetMessageKey ? translate(locale, resetMessageKey) : '');
      renderBulkStatus();
      syncBulkControl();
      syncShowMoreControls();
      syncDownloadControl();
      applyPanelCapabilities(panelRoot, pageKind, locale);
    }

    function refresh() {
      if (!panelRoot || disposed) return;
      if (!isCurrentRoute()) { onStale(); return; }
      refreshCoexistence();
      attachObservers();
      if (pageKind !== 'booklist') {
        const active = effectiveSettings(settings, capabilities);
        const library = siteLibrary();
        const lookup = typeof library?.checkIsDownloaded === 'function'
          ? library.checkIsDownloaded.bind(library) : null;
        const context = compileFilters(active, gate.state === 'ready', lookup);
        const entries = getPageEntries(document, pageKind);
        const pass = filterPageEntries(entries, pageKind, context);
        if (capabilities.format && entries.length) startDownloadTimer();
        let unknownCards = 0;
        for (let index = 0; index < entries.length; index++) {
          const entry = entries[index];
          const result = pass.results[index];
          setPageEntryHidden(entry, pageKind, !result.visible);
          if (active.filterDownload && result.download === 'unknown') unknownCards++;
        }
        attachCoverObservers(entries);
        renderPanelState(context, unknownCards, { format: 0, meta: 0, title: 0, author: 0 });
        if (!capabilities.format) {
          setText('#zble-download-summary', formatRuleSummary(settings, 'ready', context.yearRule, locale).download);
          setText('#zble-download-hint', '');
        }
        lastPanelData = { context, unknownCards, unavailable: { format: 0, meta: 0, title: 0, author: 0 } };
        syncBulkControl();
        return;
      }
      const main = document.querySelector('.booklist-main.active');
      const library = siteLibrary();
      const lookup = typeof library?.checkIsDownloaded === 'function'
        ? library.checkIsDownloaded.bind(library) : null;
      const context = compileFilters(settings, gate.state === 'ready', lookup);
      const pass = filterActiveCards(document, context);
      const { cards } = pass;
      const totalText = document.querySelector('.booklist-header__tabs tab')?.textContent || '';
      const totalLabel = parseBookTotalLabel(totalText);
      const parsedTotal = parseProgressTotal(totalText);
      const pageReady = !!main && (cards.length > 0 || parseBookTotal(totalText) === 0);
      if (pageReady) startDownloadTimer();
      const list = main?.querySelector('.readlist-view');
      const previousSummary = list?.querySelector('.zble-summary-card');
      if (previousSummary) previousSummary.style.height = '0px';
      let unknownCards = 0;
      const unavailable = { format: 0, meta: 0, title: 0, author: 0 };
      let lastVisibleCard = null;
      let fallbackMetrics = null;
      for (let index = 0; index < cards.length; index++) {
        const card = cards[index];
        const info = pass.infos[index];
        if (!renderFormatBadge(card, info.extension, settings.showFormat, locale,
          card.getAttribute('filesize'), settings.showSize)) unavailable.format++;
        if (!renderCardMeta(card, settings)) unavailable.meta++;
        if (!renderFullTitle(card, settings.showFullTitle)) unavailable.title++;
        if (!renderFullAuthor(card, settings.showFullAuthor) && settings.showFullAuthor) unavailable.author++;
        const result = pass.results[index];
        if (result.visible) lastVisibleCard = card;
        if (!fallbackMetrics && !card.classList.contains('zble-hidden')) {
          const rect = card.getBoundingClientRect();
          if (rect.width && rect.height) fallbackMetrics = { flex: getComputedStyle(card).flex,
            height: rect.height, width: rect.width, margin: getComputedStyle(card).margin };
        }
        if (settings.filterDownload && gate.state === 'ready' && result.download === 'unknown') unknownCards++;
        if (card.classList.contains('zble-hidden') === result.visible) {
          card.classList.toggle('zble-hidden', !result.visible);
        }
      }
      const stats = computeStats({ loaded: cards.length, matched: pass.matched, total: parsedTotal });
      const activeFilter = settings.filterFormat || settings.filterSize || settings.filterDownload || settings.filterYear;
      const notices = translatedNotices(context);
      if (lastVisibleCard) {
        const rect = lastVisibleCard.getBoundingClientRect();
        if (rect.width && rect.height) lastCardMetrics = { flex: getComputedStyle(lastVisibleCard).flex,
          height: rect.height, width: rect.width, margin: getComputedStyle(lastVisibleCard).margin };
      } else if (fallbackMetrics) lastCardMetrics = fallbackMetrics;
      renderFilterSummary(list, stats, activeFilter && settings.showSummary, notices, lastCardMetrics, locale, totalLabel);
      renderShowMore(main, stats, locale, settings.showProgress);
      const pendingShadow = unavailable.format + unavailable.meta + unavailable.title + unavailable.author;
      const shownUnavailable = shadowRetries >= 20 ? unavailable : { format: 0, meta: 0, title: 0, author: 0 };
      renderPanelState(context, unknownCards, shownUnavailable);
      lastPanelData = { context, unknownCards, unavailable: shownUnavailable, stats, activeFilter, list, main, totalLabel };
      syncBulkControl();
      showMoreTracker?.check();
      syncShowMoreControls();
      if (pendingShadow && shadowRetries < 20 && !retryId) {
        shadowRetries++;
        retryId = setTimeout(() => { retryId = null; scheduleRefresh(); }, 250);
      } else if (!pendingShadow) shadowRetries = 0;
    }

    function attachObservers() {
      const main = pageKind === 'booklist' ? document.querySelector('.booklist-main.active')
        : detectListPage(document, window.location?.hostname, initialPathname)?.container;
      if (main === observedMain) {
        masonryWatch = ensureMasonryShadowWatch(pageKind, main, masonryWatch, scheduleRefresh);
        return;
      }
      mainObserver?.disconnect();
      masonryWatch?.dispose();
      masonryWatch = null;
      parentObserver?.disconnect();
      for (const observer of classObservers) observer.disconnect();
      classObservers = [];
      observedMain = main;
      lastCardMetrics = null;
      if (!main) return;
      // Non-booklist lists can replace their entire container without changing the URL.
      if (pageKind === 'booklist') {
        startupObserver?.disconnect();
        startupObserver = null;
      }
      mainObserver = new MutationObserver(records => {
        if (pageKind === 'booklist') showMoreTracker?.check();
        if (mutationNeedsRefresh(records)) scheduleRefresh();
      });
      mainObserver.observe(main, { childList: true, subtree: true, attributes: true,
        attributeFilter: ['extension', 'filesize', 'year', 'language', 'disabled', 'aria-disabled', 'class', 'style'] });
      masonryWatch = ensureMasonryShadowWatch(pageKind, main, masonryWatch, scheduleRefresh);
      if (pageKind !== 'booklist') return;
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

    function attachCoverObservers(entries) {
      if (capabilities.format) return;
      const roots = new Set(entries.map(entry => entry.querySelector?.('z-cover')?.shadowRoot).filter(Boolean));
      for (const [root, observer] of coverObservers) {
        if (!roots.has(root)) { observer.disconnect(); coverObservers.delete(root); }
      }
      for (const root of roots) {
        if (coverObservers.has(root)) continue;
        const observer = new MutationObserver(scheduleRefresh);
        observer.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
        coverObservers.set(root, observer);
      }
    }

    function createPanel() {
      if (document.getElementById('zble-panel-host')) return;
      const pageStyle = document.createElement('style');
      pageStyle.id = 'zble-page-style';
      pageStyle.textContent = '.booklist-main.active .readlist-view > z-bookcard.zble-hidden,#searchResultBox .resItemBoxBooks.zble-hidden,z-masonry > a.zble-hidden,[class*="RecommendationBlock__EndlessMasonry"] a.item.zble-hidden{display:none!important}.booklist-main.active .readlist-view > .zble-summary-card{display:flex;flex-direction:column;justify-content:center;align-items:stretch;gap:14px;box-sizing:border-box;flex:0 0 23%;max-width:100%;padding:25px 22px;border:0;border-radius:16px;background:var(--card-bg-color,#fff);box-shadow:var(--box-shadow,0 2px 6px #0001);color:var(--gray-9,#243747);font:14px/1.5 system-ui,sans-serif;overflow-wrap:anywhere}.booklist-main.active .zble-summary-metric{display:flex;flex-direction:column;gap:2px;border-bottom:1px solid #9baebf66;padding-bottom:10px}.booklist-main.active .zble-summary-label{font-size:12px;opacity:.8}.booklist-main.active .zble-summary-value{font-size:23px;line-height:1.2;font-weight:750}.booklist-main.active .zble-summary-notice{font-size:12px;line-height:1.45;color:#a64b27}.booklist-main.active .page-load-more .zble-progress{display:block;font-size:12px;line-height:1.4;opacity:.82;white-space:normal}@media(prefers-color-scheme:dark){.booklist-main.active .readlist-view > .zble-summary-card{background:#222e3c;color:#edf3f8;border-color:#526b7f;border-top-color:#82bfff;box-shadow:0 2px 10px #0006}.booklist-main.active .zble-summary-notice{color:#ffbd93}}@media(forced-colors:active){.booklist-main.active .readlist-view > .zble-summary-card{border:2px solid Highlight;box-shadow:none}.booklist-main.active .zble-summary-metric{border-bottom-color:CanvasText}}';
      pageStyle.textContent += '.zble-ui-enhance-link{display:inline-block;margin:3px 6px;padding:2px;border:0;background:transparent;color:#a12f28;text-decoration:underline;cursor:pointer;font:12px/1.4 system-ui,sans-serif}.zble-ui-enhance-link:focus-visible{outline:2px solid #a12f28;outline-offset:2px}@media(prefers-color-scheme:dark){.zble-ui-enhance-link{color:#ffb0a3}}';
      (document.head || document.documentElement).append(pageStyle);

      const host = document.createElement('div');
      host.id = 'zble-panel-host';
      for (const eventName of ['click', 'change', 'input', 'pointerdown']) {
        host.addEventListener(eventName, event => {
          if (isCurrentRoute()) return;
          event.stopImmediatePropagation();
          event.preventDefault();
          onStale();
        }, true);
      }
      const main = initialContainer;
      if (pageKind === 'booklist' && main?.parentElement) main.parentElement.insertBefore(host, main);
      else document.body.append(host);
      panelRoot = host.attachShadow({ mode: 'open' });
      panelRoot.innerHTML = `
        <style>
          :host{all:initial;--zble-bg:#fff;--zble-text:#172534;--zble-border:#9baebf;--zble-accent-bg:#dcecff;--zble-accent:#075da5;--zble-line:#e0e7ee;--zble-group:#36546c;--zble-muted:#526777;--zble-spinner:#aebdca;--zble-settings-bg:#f0f6fb;--zble-settings-border:#b5cede;--zble-settings-title:#174f78;--zble-field-border:#90aaba;--zble-field-bg:#fff;--zble-hint:#4c5d6c;--zble-error:#9d311f;position:fixed;z-index:2147483000;right:10px;top:10px;width:min(315px,calc(100vw - 20px));max-height:calc(100vh - 20px);overflow:auto;box-sizing:border-box;border:1px solid var(--zble-border);border-radius:10px;background:var(--zble-bg);color:var(--zble-text);color-scheme:light;box-shadow:0 5px 20px #0003;font:13px/1.45 system-ui,-apple-system,"Segoe UI",sans-serif}
          @media(prefers-color-scheme:dark){:host{--zble-bg:#1b2430;--zble-text:#eef3f8;--zble-border:#586e80;--zble-accent-bg:#25445d;--zble-accent:#9bd3ff;--zble-line:#3e5262;--zble-group:#c2def0;--zble-muted:#bbcbd7;--zble-spinner:#7f96a8;--zble-settings-bg:#253545;--zble-settings-border:#577083;--zble-settings-title:#b7ddff;--zble-field-border:#7595aa;--zble-field-bg:#172330;--zble-hint:#cfdae2;--zble-error:#ffb0a3;color-scheme:dark;box-shadow:0 5px 20px #0008}}
          @media(max-width:600px){:host{display:block;position:relative;right:auto;top:auto;width:calc(100% - 20px);max-height:70vh;margin:10px auto 14px}}
          *{box-sizing:border-box}[hidden]{display:none!important}.body{padding:10px 12px}.head{display:flex;align-items:center;justify-content:space-between;touch-action:none;cursor:grab;user-select:none}.title{font-weight:700;font-size:14px}.head-actions{display:flex;align-items:center;gap:2px}
          button{background:transparent;border:0;border-radius:6px;color:inherit;cursor:pointer;font-size:20px;padding:2px 6px}button[aria-expanded="true"]{background:var(--zble-accent-bg);color:var(--zble-accent)}button:focus-visible,input:focus-visible,select:focus-visible{outline:2px solid var(--zble-accent);outline-offset:2px}.chevron{display:block;width:18px;height:18px;transition:transform .15s ease}#zble-collapse[aria-expanded="false"] .chevron{transform:rotate(180deg)}@media(prefers-reduced-motion:reduce){.chevron{transition:none}}
          .group{border-top:1px solid var(--zble-line);padding-top:7px;margin-top:7px}.group-title{font-weight:700;color:var(--zble-group);font-size:12px;letter-spacing:.02em}.section-toggle{display:flex;align-items:center;justify-content:space-between;width:100%;padding:2px 0;border:0;background:transparent;text-align:left;cursor:pointer}.section-toggle[aria-expanded="true"]{background:transparent;color:var(--zble-group)}.section-toggle svg{width:14px;height:14px;flex:none;transition:transform .15s ease}.section-toggle[aria-expanded="true"] svg{transform:rotate(180deg)}.automation-heading .section-toggle{flex:1}@media(prefers-reduced-motion:reduce){.section-toggle svg{transition:none}}.row{display:flex;align-items:flex-start;gap:7px;margin:6px 0;cursor:pointer}.row input{margin-top:3px;flex:none}.row:has(input:disabled){opacity:.62;cursor:not-allowed}input[type=checkbox]{accent-color:var(--zble-accent)}.summary{color:var(--zble-muted);font-size:11px;margin-left:2px;overflow-wrap:anywhere}
          .spin{display:inline-block;width:13px;height:13px;border:2px solid var(--zble-spinner);border-top-color:var(--zble-accent);border-radius:50%;animation:rotate .8s linear infinite;flex:none;margin-top:3px}@keyframes rotate{to{transform:rotate(360deg)}}@media(prefers-reduced-motion:reduce){.spin{animation:none;border:0;width:auto;height:auto}.spin:after{content:'⏳'}}
          .settings{background:var(--zble-settings-bg);border:1px solid var(--zble-settings-border);border-radius:8px;margin-top:10px;padding:10px}.settings-title{font-weight:700;color:var(--zble-settings-title);margin-bottom:8px}.configuration{background:var(--zble-field-bg);border:1px solid var(--zble-accent);border-left:4px solid var(--zble-accent);border-radius:7px;margin:3px 0 10px;padding:8px}.configuration-title{font-weight:700;color:var(--zble-accent);font-size:11px}.filter-row{display:flex;align-items:center;gap:3px}.filter-row>.row{flex:1;min-width:0}.filter-row .configure{font-size:14px;line-height:1;padding:5px;flex:none;color:var(--zble-muted)}.filter-row:has(input:checked) .configure{color:var(--zble-accent)}.configure svg,.tool-icon{width:18px;height:18px;display:block}.setting-label{display:block;font-weight:600;margin-top:10px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin:6px 0}.grid label{white-space:nowrap}
          input[type=text],select{width:100%;padding:5px;border:1px solid var(--zble-field-border);border-radius:5px;font:inherit;color:inherit;background:var(--zble-field-bg)}.year-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.hint{font-size:11px;color:var(--zble-hint);margin:4px 0 7px;overflow-wrap:anywhere}.hint:empty{display:none}.hint a{color:var(--zble-accent)}.error{color:var(--zble-error)}.reset-position{font-size:12px;border:1px solid var(--zble-field-border);background:var(--zble-field-bg);margin:6px 0;padding:4px 8px}.action-button{display:block;width:100%;font-size:12px;text-align:left;border:1px solid var(--zble-field-border);background:var(--zble-field-bg);margin:6px 0;padding:7px 9px}.action-button:disabled{opacity:.55;cursor:not-allowed}.reset-link{display:block;font:inherit;font-size:11px;color:var(--zble-accent);text-decoration:underline;text-align:left;padding:1px 0;margin:0 0 7px}.reset-link:disabled{color:var(--zble-muted);cursor:not-allowed}.action-button:active:not(:disabled),.action-button[data-state="running"]{background:#174f8c;color:#fff;border-color:#174f8c}.action-button[data-state="running"]:disabled{opacity:1;cursor:progress}.action-button[data-state="failed"]{color:#8b2e39;font-weight:700}.action-button[data-state="failed"]:active:not(:disabled){color:#fff}@media(prefers-color-scheme:dark){.action-button:active:not(:disabled),.action-button[data-state="running"]{background:#b6dcff;color:#112c43;border-color:#b6dcff}.action-button[data-state="failed"]{color:#ffb0ba}.action-button[data-state="failed"]:active:not(:disabled){color:#112c43}}@media(forced-colors:active){.configure{color:GrayText}.filter-row:has(input:checked) .configure,.reset-link:not(:disabled){color:LinkText}.configure circle{fill:Canvas}.action-button:active:not(:disabled),.action-button[data-state="running"]{background:Highlight;color:HighlightText;border-color:Highlight}.action-button[data-state="failed"]{color:Mark}.action-button[data-state="failed"]:active:not(:disabled){color:HighlightText}}
          .automation-heading{display:flex;align-items:center;justify-content:space-between;gap:6px}.automation-heading .configure{color:var(--zble-accent)}.automation-config .setting-label:first-of-type{margin-top:5px}.automation-config input[type=text]{margin-top:3px}.automation-config .row{font-weight:400}
          @media(forced-colors:active){.filter-row .configure{color:GrayText}.filter-row:has(input:checked) .configure,.automation-heading .configure{color:LinkText}}
        </style>
        <style>.zble-coexistence{margin:8px 0 4px;color:var(--zble-error);font-size:12px;line-height:1.45;overflow-wrap:anywhere}.zble-coexistence a{color:inherit;text-decoration:underline}.zble-coexistence button{font:inherit;color:inherit;text-decoration:underline;padding:0 2px}.zble-coexistence .dismiss{text-decoration:none;font-weight:bold;float:right;padding:0 5px}.zble-coexistence button:focus-visible,.zble-coexistence a:focus-visible{outline:2px solid currentColor;outline-offset:2px}</style>
        <div class="body">
          <div class="head"><span class="title">Z-lib Booklist Enhancer</span><div class="head-actions"><button id="zble-gear" type="button" title="全局设置" aria-label="全局设置" aria-controls="zble-settings" aria-expanded="false"><svg class="tool-icon" viewBox="0 0 50 50" fill="currentColor" aria-hidden="true" focusable="false"><path d="M47.16,21.221l-5.91-0.966c-0.346-1.186-0.819-2.326-1.411-3.405l3.45-4.917c0.279-0.397,0.231-0.938-0.112-1.282l-3.889-3.887c-0.347-0.346-0.893-0.391-1.291-0.104l-4.843,3.481c-1.089-0.602-2.239-1.08-3.432-1.427l-1.031-5.886C28.607,2.35,28.192,2,27.706,2h-5.5c-0.49,0-0.908,0.355-0.987,0.839l-0.956,5.854c-1.2,0.345-2.352,0.818-3.437,1.412l-4.83-3.45c-0.399-0.285-0.942-0.239-1.289,0.106L6.82,10.648c-0.343,0.343-0.391,0.883-0.112,1.28l3.399,4.863c-0.605,1.095-1.087,2.254-1.438,3.46l-5.831,0.971c-0.482,0.08-0.836,0.498-0.836,0.986v5.5c0,0.485,0.348,0.9,0.825,0.985l5.831,1.034c0.349,1.203,0.831,2.362,1.438,3.46l-3.441,4.813c-0.284,0.397-0.239,0.942,0.106,1.289l3.888,3.891c0.343,0.343,0.884,0.391,1.281,0.112l4.87-3.411c1.093,0.601,2.248,1.078,3.445,1.424l0.976,5.861C21.3,47.647,21.717,48,22.206,48h5.5c0.485,0,0.9-0.348,0.984-0.825l1.045-5.89c1.199-0.353,2.348-0.833,3.43-1.435l4.905,3.441c0.398,0.281,0.938,0.232,1.282-0.111l3.888-3.891c0.346-0.347,0.391-0.894,0.104-1.292l-3.498-4.857c0.593-1.08,1.064-2.222,1.407-3.408l5.918-1.039c0.479-0.084,0.827-0.5,0.827-0.985v-5.5C47.999,21.718,47.644,21.3,47.16,21.221z M25,32c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7s7,3.134,7,7C32,28.866,28.866,32,25,32z"/></svg></button><button id="zble-collapse" type="button" title="折叠面板" aria-label="折叠面板" aria-controls="zble-content" aria-expanded="true"><svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 14 L12 9 L20 14"/></svg></button></div></div>
          <div id="zble-coexistence-notice" class="zble-coexistence" role="status" hidden><span id="zble-coexistence-before"></span><a id="zble-coexistence-script" href="https://greasyfork.org/scripts/497146-z-library-ui-enhance" target="_blank" rel="noopener noreferrer">UI Enhance 脚本</a><span id="zble-coexistence-after"></span> <button id="zble-coexistence-details" type="button">了解详情</button><button id="zble-coexistence-dismiss" class="dismiss" type="button" aria-label="关闭提示">×</button></div>
          <div id="zble-content">
          <div class="group"><div class="group-title" data-i18n="section.filters">筛选器</div>
            <div class="filter-row"><label class="row"><input id="zble-format-switch" type="checkbox"><span><span data-i18n="control.filterFormat">只显示指定文件格式</span> <span id="zble-format-summary" class="summary"></span></span></label><button id="zble-configure-format" class="configure" type="button" aria-controls="zble-format-config" aria-expanded="false" aria-label="配置文件格式筛选"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 7h16M4 12h16M4 17h16"/><circle cx="9" cy="7" r="2" fill="var(--zble-bg)"/><circle cx="15" cy="12" r="2" fill="var(--zble-bg)"/><circle cx="7" cy="17" r="2" fill="var(--zble-bg)"/></svg></button></div>
            <div id="zble-format-hint" class="hint error" role="status"></div>
            <div id="zble-format-config" class="configuration" hidden><div class="configuration-title" data-i18n="section.configuration">筛选配置</div><div class="setting-label" data-i18n="setting.formats">筛选文件格式（可多选）</div><div class="grid"><label><input type="checkbox" data-format="pdf"> PDF</label><label><input type="checkbox" data-format="epub"> EPUB</label><label><input type="checkbox" data-format="azw3"> AZW3</label><label><input type="checkbox" data-format="mobi"> MOBI</label><label><input type="checkbox" data-format="other"> <span data-i18n="setting.other">其他全部</span></label><label><input type="checkbox" data-format="custom"> <span data-i18n="setting.custom">自定义</span></label></div><input id="zble-custom" type="text" aria-label="自定义文件格式" placeholder="如 djvu, txt; fb2"><div class="hint" data-i18n="setting.customHint">自定义格式用逗号或分号分隔。</div></div>
            <div class="filter-row"><label class="row"><input id="zble-size-filter-switch" type="checkbox"><span><span data-i18n="control.filterSize">只显示指定文件大小</span> <span id="zble-size-summary" class="summary"></span></span></label><button id="zble-configure-size" class="configure" type="button" aria-controls="zble-size-config" aria-expanded="false" aria-label="配置文件大小筛选"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 7h16M4 12h16M4 17h16"/><circle cx="9" cy="7" r="2" fill="var(--zble-bg)"/><circle cx="15" cy="12" r="2" fill="var(--zble-bg)"/><circle cx="7" cy="17" r="2" fill="var(--zble-bg)"/></svg></button></div>
            <div id="zble-size-hint" class="hint error" role="status"></div>
            <div id="zble-size-config" class="configuration" hidden><div class="configuration-title" data-i18n="section.configuration">筛选配置</div><div class="setting-label" data-i18n="setting.sizeBands">文件大小范围（可多选）</div><div class="grid"><label><input type="checkbox" data-size-band="lt1"> <span data-i18n="setting.size.lt1">小于 1 MB</span></label><label><input type="checkbox" data-size-band="1to10"> <span data-i18n="setting.size.1to10">1–10 MB</span></label><label><input type="checkbox" data-size-band="10to50"> <span data-i18n="setting.size.10to50">10–50 MB</span></label><label><input type="checkbox" data-size-band="50to100"> <span data-i18n="setting.size.50to100">50–100 MB</span></label><label><input type="checkbox" data-size-band="gte100"> <span data-i18n="setting.size.gte100">100 MB 及以上</span></label><label><input type="checkbox" data-size-band="unknown"> <span data-i18n="setting.size.unknown">未知大小</span></label></div></div>
            <div class="filter-row"><label class="row"><input id="zble-download-switch" type="checkbox"><span><span data-i18n="control.filterDownload">只显示指定下载状态</span> <span id="zble-download-summary" class="summary"></span></span><span id="zble-wait-icon" class="spin" aria-label="等待下载状态"></span><span id="zble-warn-icon" hidden aria-label="下载状态未确认">⚠️</span></label><button id="zble-configure-download" class="configure" type="button" aria-controls="zble-download-config" aria-expanded="false" aria-label="配置下载状态筛选"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 7h16M4 12h16M4 17h16"/><circle cx="9" cy="7" r="2" fill="var(--zble-bg)"/><circle cx="15" cy="12" r="2" fill="var(--zble-bg)"/><circle cx="7" cy="17" r="2" fill="var(--zble-bg)"/></svg></button></div>
            <div id="zble-download-hint" class="hint error" role="status"></div>
            <div id="zble-download-config" class="configuration" hidden><div class="configuration-title" data-i18n="section.configuration">筛选配置</div><label class="setting-label" for="zble-download-rule" data-i18n="setting.downloadRule">下载状态规则</label><select id="zble-download-rule"><option value="not-downloaded" data-i18n="setting.onlyUndownloaded">仅未下载</option><option value="downloaded" data-i18n="setting.onlyDownloaded">仅已下载</option></select></div>
            <div class="filter-row"><label class="row"><input id="zble-year-filter-switch" type="checkbox"><span><span data-i18n="control.filterYear">只显示指定年份的书籍</span> <span id="zble-year-summary" class="summary"></span></span></label><button id="zble-configure-year" class="configure" type="button" aria-controls="zble-year-config" aria-expanded="false" aria-label="配置年份筛选"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 7h16M4 12h16M4 17h16"/><circle cx="9" cy="7" r="2" fill="var(--zble-bg)"/><circle cx="15" cy="12" r="2" fill="var(--zble-bg)"/><circle cx="7" cy="17" r="2" fill="var(--zble-bg)"/></svg></button></div>
            <div id="zble-year-hint" class="hint error" role="status"></div>
            <div id="zble-year-config" class="configuration" hidden><div class="configuration-title" data-i18n="section.configuration">筛选配置</div><div class="setting-label" data-i18n="setting.yearRange">出版年份范围（含端点）</div><div class="year-grid"><label><span data-i18n="setting.minYear">起始年份</span><input id="zble-year-min" type="text" inputmode="numeric" aria-label="起始年份" placeholder="留空不限"></label><label><span data-i18n="setting.maxYear">截止年份</span><input id="zble-year-max" type="text" inputmode="numeric" aria-label="截止年份" placeholder="留空不限"></label></div><div class="hint" data-i18n="setting.yearHint">输入后停顿或按回车生效；可只填一端。</div><label class="row"><input id="zble-missing-year" type="checkbox"><span data-i18n="setting.missingYear">显示年份缺失的书籍</span></label></div>
          </div>
          <div class="group"><div class="group-title" data-i18n="section.info">信息显示</div>
            <label class="row"><input id="zble-show-switch" type="checkbox"><span data-i18n="control.formatBadge">文件格式标签</span></label>
            <label class="row"><input id="zble-size-switch" type="checkbox"><span data-i18n="control.sizeBadge">文件大小标签</span></label>
            <label class="row"><input id="zble-progress-switch" type="checkbox"><span data-i18n="control.showProgress">Show more 按钮显示页码</span></label>
            <label class="row"><input id="zble-summary-switch" type="checkbox"><span data-i18n="control.showSummary">列表末尾统计卡片</span></label>
            <label class="row"><input id="zble-language-switch" type="checkbox"><span data-i18n="control.language">书籍语言（页面自带）</span></label>
            <label class="row"><input id="zble-year-show-switch" type="checkbox"><span data-i18n="control.year">出版年份（页面自带）</span></label>
            <label class="row"><input id="zble-title-switch" type="checkbox"><span data-i18n="control.fullTitle">完整显示超长书名</span></label>
            <label class="row"><input id="zble-author-switch" type="checkbox"><span data-i18n="control.fullAuthor">完整显示超长作者名</span></label>
            <div id="zble-info-hint" class="hint error" role="status"></div>
          </div>
          <div class="group"><div class="automation-heading"><div class="group-title" data-i18n="section.automation">自动化（beta）</div><button id="zble-configure-automation" class="configure" type="button" aria-controls="zble-automation-config" aria-expanded="false" aria-label="配置自动化"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 7h16M4 12h16M4 17h16"/><circle cx="9" cy="7" r="2" fill="var(--zble-bg)"/><circle cx="15" cy="12" r="2" fill="var(--zble-bg)"/><circle cx="7" cy="17" r="2" fill="var(--zble-bg)"/></svg></button></div><div id="zble-automation-config" class="configuration automation-config" hidden><div class="configuration-title" data-i18n="section.automationConfig">自动化设置</div><label class="setting-label" for="zble-show-more-count-1" data-i18n="setting.showMoreCount1">连点器 1 次数</label><input id="zble-show-more-count-1" type="text" inputmode="numeric" aria-describedby="zble-show-more-error-1"><div id="zble-show-more-error-1" class="hint error" role="status"></div><label class="setting-label" for="zble-show-more-count-2" data-i18n="setting.showMoreCount2">连点器 2 次数</label><input id="zble-show-more-count-2" type="text" inputmode="numeric" aria-describedby="zble-show-more-error-2"><div id="zble-show-more-error-2" class="hint error" role="status"></div><label class="row"><input id="zble-allow-continuous" type="checkbox"><span data-i18n="setting.continuousEnabled">在本站启用持续连点</span></label><label class="row"><input id="zble-allow-bulk" type="checkbox"><span data-i18n="setting.allowBulk">在本站启用批量打开</span></label></div><div id="zble-automation-actions"><button id="zble-show-more-1" class="action-button" type="button" aria-live="polite">连点 5 次 Show more</button><button id="zble-show-more-2" class="action-button" type="button" aria-live="polite">连点 10 次 Show more</button><button id="zble-show-more-continuous" class="action-button" type="button" aria-live="polite">持续连点 Show more，直到书单显示完毕</button><button id="zble-reset-show-more" class="reset-link" type="button" data-i18n="auto.resetShowMore" disabled>重置 Show more 按钮可用性</button><div id="zble-reset-hint" class="hint" role="status"></div><div id="zble-show-more-status" class="hint" role="status"></div><button id="zble-open-all" class="action-button" type="button" data-i18n="auto.openAll" disabled>打开当前显示的所有图书页面</button><div id="zble-open-hint" class="hint" role="status"></div><div id="zble-open-status" class="hint" role="status"></div><button id="zble-favorite" class="action-button" type="button" disabled>[<span data-i18n="auto.dev">开发中</span>] <span data-i18n="auto.favorite">本页全部加入收藏</span></button></div></div>
          <div id="zble-settings" class="settings" hidden>
            <div class="settings-title" data-i18n="action.globalSettings">全局设置</div>
            <label class="setting-label" for="zble-ui-language" data-i18n="setting.language">界面语言</label>
            <select id="zble-ui-language"><option value="auto" data-i18n="setting.autoLanguage">跟随浏览器/系统</option><option value="en">English</option><option value="zh-CN">简体中文</option><option value="zh-TW">繁體中文</option><option value="fr">Français</option><option value="de">Deutsch</option><option value="ru">Русский</option><option value="ja">日本語</option><option value="ko">한국어</option><option value="es">Español</option><option value="pt-BR">Português (Brasil)</option></select>
            <label class="row"><input id="zble-show-notice" type="checkbox"><span data-i18n="setting.showNotice">在本站显示启动提示</span></label>
            <button id="zble-reset-position" class="reset-position" type="button" data-i18n="setting.resetPosition">重置浮窗位置</button>
            <div class="hint" data-i18n="setting.userMatches">其他镜像：请在 Tampermonkey 中添加 User matches。</div>
            <div class="group"><div class="settings-title" data-i18n="section.about">关于</div><div class="hint" data-i18n="about.description">增强书单并筛选搜索结果；推荐和热门书籍可按下载状态筛选。</div><div class="hint"><span data-i18n="about.developer">开发者</span>：<span>Jeambo</span></div><div class="hint"><span data-i18n="about.github">GitHub 页面</span>：<a href="https://github.com/jeambos/zlibrary-booklist-enhancer" target="_blank" rel="noopener noreferrer">https://github.com/jeambos/zlibrary-booklist-enhancer</a></div><button id="zble-coexistence-about" class="reset-link" type="button" data-i18n="coexist.about">兼容性说明</button></div>
          </div>
          </div>
        </div>`;

      const coexistenceDetails = panelRoot.querySelector('#zble-coexistence-details');
      coexistenceDetails.addEventListener('click', () => showCoexistenceDialog(coexistenceDetails));
      panelRoot.querySelector('#zble-coexistence-dismiss').addEventListener('click', () => {
        coexistenceDismissed = true;
        try { window.sessionStorage?.setItem(coexistenceDismissKey, '1'); }
        catch { /* Keep the in-document dismissal. */ }
        refreshCoexistence();
      });
      const coexistenceAbout = panelRoot.querySelector('#zble-coexistence-about');
      coexistenceAbout.addEventListener('click', () => showCoexistenceDialog(coexistenceAbout));

      for (const [name, expanded] of [['filters', true], ['info', false], ['automation', false]]) {
        const title = [...panelRoot.querySelectorAll('[data-i18n]')]
          .find(node => node.dataset.i18n === `section.${name}`);
        const group = title.closest('.group');
        const heading = name === 'automation' ? title.parentElement : null;
        const button = document.createElement('button');
        button.type = 'button';
        button.id = `zble-${name}-toggle`;
        button.className = 'group-title section-toggle';
        button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 9l7 7 7-7"/></svg>';
        const label = document.createElement('span');
        label.dataset.i18n = `section.${name}`;
        label.textContent = title.textContent;
        button.prepend(label);
        title.replaceWith(button);
        const body = document.createElement('div');
        body.id = `zble-${name}-body`;
        button.setAttribute('aria-controls', body.id);
        const anchor = heading || button;
        while (anchor.nextSibling) body.append(anchor.nextSibling);
        group.append(body);
        bindSectionToggle(button, body, expanded, () => requestAnimationFrame(applySavedDock));
      }

      const infoAvailability = document.createElement('span');
      infoAvailability.id = 'zble-info-availability';
      infoAvailability.className = 'summary';
      const infoToggle = panelRoot.querySelector('#zble-info-toggle');
      infoToggle.insertBefore(infoAvailability, infoToggle.querySelector('svg'));

      const availabilityHint = document.createElement('div');
      availabilityHint.id = 'zble-show-more-availability';
      availabilityHint.className = 'hint';
      availabilityHint.setAttribute('role', 'status');
      panelRoot.querySelector('#zble-automation-actions').insertBefore(availabilityHint,
        panelRoot.querySelector('#zble-reset-show-more'));

      const immediate = [
        ['#zble-show-switch', 'showFormat'], ['#zble-size-switch', 'showSize'],
        ['#zble-progress-switch', 'showProgress'], ['#zble-summary-switch', 'showSummary'],
        ['#zble-language-switch', 'showLanguage'],
        ['#zble-year-show-switch', 'showYear'], ['#zble-title-switch', 'showFullTitle'],
        ['#zble-author-switch', 'showFullAuthor'],
        ['#zble-format-switch', 'filterFormat'], ['#zble-size-filter-switch', 'filterSize'],
        ['#zble-download-switch', 'filterDownload'],
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
          bulkOpenEnabled: sitePrefs[currentHost]?.bulkOpenEnabled === true,
          continuousEnabled: sitePrefs[currentHost]?.continuousEnabled === true };
        saveSitePrefs(sitePrefs);
      });
      const bulkInput = panelRoot.querySelector('#zble-allow-bulk');
      bulkInput.checked = sitePrefs[currentHost]?.bulkOpenEnabled === true;
      bulkInput.addEventListener('change', () => {
        sitePrefs[currentHost] = { welcomeEnabled: sitePrefs[currentHost]?.welcomeEnabled !== false,
          bulkOpenEnabled: bulkInput.checked,
          continuousEnabled: sitePrefs[currentHost]?.continuousEnabled === true };
        saveSitePrefs(sitePrefs);
        syncBulkControl();
      });
      const continuousInput = panelRoot.querySelector('#zble-allow-continuous');
      continuousInput.checked = sitePrefs[currentHost]?.continuousEnabled === true;
      continuousInput.addEventListener('change', () => {
        sitePrefs[currentHost] = { welcomeEnabled: sitePrefs[currentHost]?.welcomeEnabled !== false,
          bulkOpenEnabled: sitePrefs[currentHost]?.bulkOpenEnabled === true,
          continuousEnabled: continuousInput.checked };
        saveSitePrefs(sitePrefs);
        syncShowMoreControls();
      });
      for (const index of [1, 2]) {
        const input = panelRoot.querySelector(`#zble-show-more-count-${index}`);
        const key = `showMoreCount${index}`;
        input.value = String(settings[key]);
        input.addEventListener('input', () => {
          const parsed = parseShowMoreCount(input.value, index === 1 ? 5 : 10);
          if (parsed.valid) { settings[key] = parsed.count; saveSettings(); }
          renderAutoStatus();
        });
      }
      for (const input of panelRoot.querySelectorAll('[data-format]')) {
        input.checked = settings.formats.includes(input.dataset.format);
        input.addEventListener('change', () => {
          settings.formats = [...panelRoot.querySelectorAll('[data-format]:checked')].map(item => item.dataset.format);
          saveSettings(); scheduleRefresh();
        });
      }
      for (const input of panelRoot.querySelectorAll('[data-size-band]')) {
        input.checked = settings.sizeBands.includes(input.dataset.sizeBand);
        input.addEventListener('change', () => {
          settings.sizeBands = [...panelRoot.querySelectorAll('[data-size-band]:checked')]
            .map(item => item.dataset.sizeBand);
          saveSettings(); scheduleRefresh();
        });
      }
      showMoreTracker = createShowMoreStallTracker({ getCards: () => getActiveCards(document),
        getButton: () => isCurrentBooklist() ? initialMain?.querySelector('.page-load-more') : null,
        onState(state) {
          stallState = state;
          if (resetVerification) {
            const currentButton = initialMain?.querySelector('.page-load-more');
            const verdict = classifyResetVerification(resetVerification,
              currentButton, getActiveCards(document).length,
              isNativeShowMoreUnavailable(currentButton));
            if (verdict !== 'pending') {
              resetVerification = null;
              resetMessageKey = verdict === 'failed' ? 'auto.resetFailed' : '';
              setText('#zble-reset-hint', resetMessageKey ? translate(locale, resetMessageKey) : '');
              if (verdict === 'failed') void showAutomationDialog('reset', 1);
            }
          }
          syncShowMoreControls();
        } });
      initialMain?.addEventListener('click', onNativeShowMoreClick, true);
      const resetButton = panelRoot.querySelector('#zble-reset-show-more');
      resetButton.addEventListener('click', () => {
        if (!isCurrentBooklist()) return;
        const button = initialMain?.querySelector('.page-load-more');
        let result;
        try {
          result = attemptShowMoreReset({ button, baseline: showMoreTracker.baseline(),
            stillEligible: () => showMoreTracker.check().resetEligible });
        } catch (error) {
          console.error('Z-lib Booklist Enhancer: Show more reset failed', error);
          result = { attempted: false, interactive: false };
        }
        if (result.attempted) showMoreTracker.consumeReset();
        resetMessageKey = result.interactive ? 'auto.resetCaution' : 'auto.resetFailed';
        resetVerification = result.interactive
          ? { button, cardCount: getActiveCards(document).length } : null;
        setText('#zble-reset-hint', translate(locale, resetMessageKey));
        syncShowMoreControls();
        void showAutomationDialog('reset', result.interactive ? 0 : 1);
      });
      showMoreTracker.check();
      function startShowMore(id, maxClicks) {
        if (showMoreTask || bulkBusy || !isCurrentBooklist()) return;
        const nativeButton = initialMain?.querySelector('.page-load-more');
        if (isNativeShowMoreUnavailable(nativeButton)) { syncShowMoreControls(); return; }
        showMoreBusy = true;
        activeShowMoreId = id;
        activeShowMoreLimit = maxClicks;
        autoLastFailed = false;
        autoStatus = { phase: 'running' };
        showMoreController = new AbortController();
        const controller = showMoreController;
        const sourceAbort = () => controller.abort('source-gone');
        automationAbort.signal.addEventListener('abort', sourceAbort, { once: true });
        renderAutoStatus();
        syncShowMoreControls();
        syncBulkControl();
        const mainForTask = document.querySelector('.booklist-main.active');
        const listForTask = mainForTask?.querySelector('.readlist-view');
        showMoreTask = runShowMore({ maxClicks,
          getCards: () => listForTask ? [...listForTask.querySelectorAll(':scope > z-bookcard')] : [],
          findButton: () => mainForTask?.querySelector('.page-load-more'),
          observe(callback) {
            const observer = new MutationObserver(callback);
            observer.observe(mainForTask, { childList: true, subtree: true });
            return () => observer.disconnect();
          },
          isSourceAlive: isCurrentBooklist,
          signal: controller.signal,
          onAttempt(button) {
            resetVerification = null;
            resetMessageKey = '';
            setText('#zble-reset-hint', '');
            showMoreTracker?.noteToolClick(button);
          },
          onProgress(progress) { autoStatus = progress; renderAutoStatus(); },
        }).then(result => {
          autoLastFailed = result.failed > 0;
          const loaded = getActiveCards(document).length;
          const totalText = document.querySelector('.booklist-header__tabs tab')?.textContent || '';
          const expectedTotal = parseBookTotal(totalText);
          const completion = classifyListCompletion({ reason: result.reason,
            loadedCount: loaded, expectedTotal });
          autoStatus = { ...result, loaded, expected: parseBookTotalLabel(totalText) ?? expectedTotal,
            noticeKey: completion.noticeKey };
          renderAutoStatus();
          return result;
        }).finally(() => {
          automationAbort.signal.removeEventListener('abort', sourceAbort);
          showMoreController = null;
          showMoreTask = null;
          showMoreBusy = false;
          if (!disposed) { renderAutoStatus(); syncShowMoreControls(); }
          syncBulkControl();
        });
      }
      for (const index of [1, 2]) {
        panelRoot.querySelector(`#zble-show-more-${index}`).addEventListener('click', () => {
          if (showMoreBusy && activeShowMoreId === index) { showMoreController?.abort('user-stop'); return; }
          const input = panelRoot.querySelector(`#zble-show-more-count-${index}`);
          startShowMore(index, parseShowMoreCount(input.value, index === 1 ? 5 : 10).count);
        });
      }
      panelRoot.querySelector('#zble-show-more-continuous').addEventListener('click', async () => {
        if (showMoreBusy && activeShowMoreId === 'continuous') {
          showMoreController?.abort('user-stop'); return;
        }
        if (showMoreDialogPending || showMoreTask || bulkBusy || !isCurrentBooklist()) return;
        const enabled = sitePrefs[currentHost]?.continuousEnabled === true;
        showMoreDialogPending = true;
        syncShowMoreControls();
        syncBulkControl();
        try {
          const approved = await showAutomationDialog('continuous', enabled ? 1 : 0);
          if (!approved || !isCurrentBooklist() ||
            sitePrefs[currentHost]?.continuousEnabled !== true) return;
          startShowMore('continuous', null);
        } finally {
          showMoreDialogPending = false;
          syncShowMoreControls();
          syncBulkControl();
        }
      });
      const openAllButton = panelRoot.querySelector('#zble-open-all');
      openAllButton.addEventListener('click', async () => {
        if (bulkBusy || showMoreBusy || showMoreTask || showMoreDialogPending || !isCurrentRoute()) return;
        const gate = currentBulkGate();
        const decision = bulkClickDecision({ enabled: sitePrefs[currentHost]?.bulkOpenEnabled === true,
          gate, targetCount: gate.allowed ? currentOpenTargets().length : 0 });
        if (decision === 'enable-info') { await showBulkDialog(0, { count: 0, repeat: false }); return; }
        if (decision !== 'confirm') { syncBulkControl(); return; }
        const urls = currentOpenTargets();
        if (!urls.length) { syncBulkControl(); return; }
        bulkBusy = true;
        bulkLastFailed = false;
        openAllButton.disabled = true;
        syncShowMoreControls();
        syncBulkControl();
        bulkMessageKey = '';
        renderBulkStatus();
        try {
          const approved = await confirmBulkOpen({ urls,
            getCurrentTargets: () => currentBulkGate().allowed ? currentOpenTargets() : [],
            getDomainEnabled: () => sitePrefs[currentHost]?.bulkOpenEnabled === true,
            showDialog: showBulkDialog, isSourceAlive: isCurrentRoute,
            getFilterSignature: currentFilterSignature,
            getCardSnapshot: () => getPageEntries(document, pageKind),
            onInvalid() { bulkMessageKey = 'auto.bulkChanged'; },
            repeat: hasOpenedOnThisPage });
          if (!approved) {
            renderBulkStatus();
            return;
          }
          const result = await runOpenAll({ urls, openTab: (url, options) => GM_openInTab(url, options),
            isSourceAlive: isCurrentRoute,
            onProgress(progress) { bulkStatus = progress; renderBulkStatus(); } });
          if (result.attempted > 0) hasOpenedOnThisPage = true;
          bulkLastFailed = result.failed > 0;
          bulkStatus = result;
          renderBulkStatus();
        } catch {
          bulkLastFailed = true;
          bulkMessageKey = 'auto.showMoreError';
          renderBulkStatus();
        } finally {
          bulkBusy = false;
          if (!disposed) syncShowMoreControls();
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
      const disclosure = createExclusiveDisclosure(['global', 'format', 'size', 'download', 'year', 'automation'], section => {
        for (const flush of flushInputs[section] || []) flush();
      });
      function renderDisclosure() {
        const current = disclosure.current();
        settingsPanel.hidden = current !== 'global';
        gear.setAttribute('aria-expanded', String(current === 'global'));
        panelRoot.querySelector('#zble-automation-config').hidden = current !== 'automation';
        panelRoot.querySelector('#zble-configure-automation').setAttribute('aria-expanded', String(current === 'automation'));
        for (const name of ['format', 'size', 'download', 'year']) {
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
      for (const name of ['format', 'size', 'download', 'year']) {
        panelRoot.querySelector(`#zble-configure-${name}`).addEventListener('click', () => {
          if (content.hidden) setCollapsed(false);
          disclosure.toggle(name);
          renderDisclosure();
        });
      }
      panelRoot.querySelector('#zble-configure-automation').addEventListener('click', () => {
        if (content.hidden) setCollapsed(false);
        if (panelRoot.querySelector('#zble-automation-body').hidden)
          panelRoot.querySelector('#zble-automation-toggle').click();
        disclosure.toggle('automation');
        renderDisclosure();
      });
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
      syncShowMoreControls();
      startupObserver = new MutationObserver(() => { scheduleRefresh(); if (!isCurrentRoute()) onStale(); });
      startupObserver.observe(document.documentElement, { childList: true, subtree: true });
      if (pageKind === 'search') {
        let scans = 0;
        searchCoexistenceTimer = setInterval(() => {
          if (++scans >= 30 || coexistenceNoticeMode(document, pageKind) === 'detected') {
            clearInterval(searchCoexistenceTimer);
            searchCoexistenceTimer = null;
          }
          refreshCoexistence();
        }, 500);
      }
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
      clearInterval(searchCoexistenceTimer);
      for (const link of coexistenceLinks) link.remove();
      coexistenceLinks.clear();
      showMoreTracker?.dispose();
      initialMain?.removeEventListener?.('click', onNativeShowMoreClick, true);
      document.removeEventListener?.('DOMContentLoaded', init);
      document.removeEventListener('marksLoaded', onMarksLoaded);
      clearTimeout(timeoutId);
      clearTimeout(retryId);
      startupObserver?.disconnect();
      mainObserver?.disconnect();
      masonryWatch?.dispose();
      parentObserver?.disconnect();
      for (const observer of classObservers) observer.disconnect();
      for (const observer of coverObservers.values()) observer.disconnect();
      if (panelResize) window.removeEventListener?.('resize', panelResize);
      for (const entry of getPageEntries(document, pageKind)) setPageEntryHidden(entry, pageKind, false);
      for (const card of initialMain?.querySelectorAll?.('.readlist-view > z-bookcard') || []) {
        card.classList.remove('zble-hidden');
        renderFormatBadge(card, card.getAttribute('extension'), false, locale, '', false);
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
