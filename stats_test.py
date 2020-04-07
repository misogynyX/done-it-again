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
