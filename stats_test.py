import stats


def test_aggregate_by_date_cp_tag():
    raw = [
        {'date': '20200101', 'cp_name': 'A', 'tags': ['t0', 't1']},
        {'date': '20200101', 'cp_name': 'A', 'tags': ['t1']},
        {'date': '20200101', 'cp_name': 'B', 'tags': ['t1']},
        {'date': '20200102', 'cp_name': 'C', 'tags': ['t1']},
        {'date': '20200102', 'cp_name': 'C', 'tags': ['t1']},
        {'date': '20200102', 'cp_name': 'C', 'tags': []},
    ]
    actual = stats.aggregate_by_date_cp_tag(raw)
    expected = [
        {'date': '20200101', 'cp_name': 'A', 'tag': 't0', 'count': 1},
        {'date': '20200101', 'cp_name': 'A', 'tag': 't1', 'count': 2},
        {'date': '20200101', 'cp_name': 'B', 'tag': 't1', 'count': 1},
        {'date': '20200102', 'cp_name': 'C', 'tag': 'clean', 'count': 1},
        {'date': '20200102', 'cp_name': 'C', 'tag': 't1', 'count': 2},
    ]
    assert expected == actual


def test_most_frequent_tags():
    table = [
        {'date': '20200101', 'cp_name': 'A', 'tag': 't0', 'count': 1},
        {'date': '20200101', 'cp_name': 'A', 'tag': 't1', 'count': 2},
        {'date': '20200102', 'cp_name': 'B', 'tag': 't1', 'count': 1},
        {'date': '20200102', 'cp_name': 'C', 'tag': 'clean', 'count': 1},
        {'date': '20200102', 'cp_name': 'C', 'tag': 't1', 'count': 2},
    ]
    actual = stats.frequent_tags(table)
    expected = [
        {'tag': 't1', 'count': 5, 'total': 6, 'ratio': 5 / 6},
        {'tag': 't0', 'count': 1, 'total': 6, 'ratio': 1 / 6},
    ]
    assert expected == actual


def test_worst_and_best_cps():
    table = [
        {'date': '20200101', 'cp_name': 'A', 'tag': 't0', 'count': 1},
        {'date': '20200101', 'cp_name': 'A', 'tag': 't1', 'count': 2},
        {'date': '20200102', 'cp_name': 'B', 'tag': 't1', 'count': 1},
        {'date': '20200102', 'cp_name': 'C', 'tag': 'clean', 'count': 1},
        {'date': '20200102', 'cp_name': 'C', 'tag': 't1', 'count': 2},
    ]

    actual_worst = stats.worst_cps(table, min_count=0)
    expected_worst = [
        {'cp_name': 'A', 'bad': 3, 'clean': 0, 'total': 3, 'ratio': 3 / 3},
        {'cp_name': 'B', 'bad': 1, 'clean': 0, 'total': 1, 'ratio': 1 / 1},
        {'cp_name': 'C', 'bad': 2, 'clean': 1, 'total': 3, 'ratio': 2 / 3},
    ]
    assert expected_worst == actual_worst

    actual_best = stats.best_cps(table, min_count=0)
    expected_best = [
        {'cp_name': 'C', 'bad': 2, 'clean': 1, 'total': 3, 'ratio': 2 / 3},
        {'cp_name': 'A', 'bad': 3, 'clean': 0, 'total': 3, 'ratio': 3 / 3},
        {'cp_name': 'B', 'bad': 1, 'clean': 0, 'total': 1, 'ratio': 1 / 1},
    ]
    assert expected_best == actual_best


def test_daily_articles():
    table = [
        {'date': '20200101', 'cp_name': 'A', 'tag': 't0', 'count': 1},
        {'date': '20200101', 'cp_name': 'A', 'tag': 't1', 'count': 2},
        {'date': '20200102', 'cp_name': 'B', 'tag': 't1', 'count': 1},
        {'date': '20200102', 'cp_name': 'C', 'tag': 'clean', 'count': 1},
        {'date': '20200102', 'cp_name': 'C', 'tag': 't1', 'count': 2},
    ]

    actual = stats.daily_articles(table)

    # 테스트 편의를 위해 z-score는 제외
    for a in actual:
        del a['z']

    expected = [
        {'date': '20200101', 'bad': 3, 'clean': 0, 'total': 3, 'ratio': 3 / 3},
        {'date': '20200102', 'bad': 3, 'clean': 1, 'total': 4, 'ratio': 3 / 4},
    ]
    assert expected == actual


def test_masking():
    assert stats.mask('new오my1') == 'n○○ᄋ○○1'
