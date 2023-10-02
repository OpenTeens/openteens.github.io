import json

# Read the contents of search/index.txt
with open('search/index.txt', 'r') as f:
    lines = f.readlines()

# Parse the contents of index.txt and create a dictionary
index = {}
for line in lines:
    parts = line.strip().split(': ', 1)
    if len(parts) == 2:
        keyword, info = parts
        index[keyword] = eval(info)

# Write the dictionary to a JSON file
with open('search/index.json', 'w') as f:
    json.dump(index, f)
