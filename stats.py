def aggregate_by_date_cp_tag(articles):
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

