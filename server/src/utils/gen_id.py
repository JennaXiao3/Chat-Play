ids: dict[str, int] = {}

def gen_id(id_type: str):
    ids[id_type] += 1
    return ids[id_type]
