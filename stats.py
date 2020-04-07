def aggregate_by_date_cp_tag(articles):
    """원본 데이터를 받아서 일별/언론별/태그별로 집계"""
    counters = {}
    for a in articles:
        for tag in a['tags'] or ['clean']:
            key = (a['date'], a['cp_name'], tag)
            counters[key] = counters.get(key, 0) + 1

    keys = sorted(counters.keys())
    return [
        {'date': k[0], 'cp_name': k[1], 'tag': k[2], 'count': counters[k]}
        for k in keys
    ]


def frequent_tags(table):
    """일별/언론별/태그별 집계 테이블을 받아서 태그별로 재집계한 후 가장
    빈번한 태그 순으로 정렬"""
    counters = {}
    total = 0
    for row in (r for r in table if r['tag'] != 'clean'):
        counters[row['tag']] = counters.get(row['tag'], 0) + row['count']
        total += row['count']

    results = (
        {'tag': tag, 'count': count, 'total': total, 'ratio': count / total}
        for tag, count in counters.items()
    )
    return sorted(results, key=lambda row: (-row['ratio'], row['tag']))


def best_cps(table, min_count):
    """일별/언론별/태그별 집계 테이블을 받아서 언론사별로 재집계한 후 가장
    부적절한 표현의 비율이 낮은 순으로 정렬"""
    results = _cps(table, min_count)
    return sorted(results, key=lambda row: (row['ratio'], -row['total']))


def worst_cps(table, min_count):
    """일별/언론별/태그별 집계 테이블을 받아서 언론사별로 재집계한 후 가장
    부적절한 표현의 비율이 높은 순으로 정렬"""
    results = _cps(table, min_count)
    return sorted(results, key=lambda row: (-row['ratio'], -row['total']))


def _cps(table, min_count):
    """일별/언론별/태그별 집계 테이블을 받아서 언론사별로 재집계"""
    counters = {}
    for row in table:
        counter = counters.get(row['cp_name'], {'clean': 0, 'bad': 0})
        if row['tag'] == 'clean':
            counter['clean'] += row['count']
        else:
            counter['bad'] += row['count']
        counters[row['cp_name']] = counter

    return (
        {
            'cp_name': cp_name,
            'clean': counter['clean'],
            'bad': counter['bad'],
            'total': counter['clean'] + counter['bad'],
            'ratio': counter['bad'] / (counter['clean'] + counter['bad']),
        }
        for cp_name, counter in counters.items()
        if counter['clean'] + counter['bad'] >= min_count
    )

