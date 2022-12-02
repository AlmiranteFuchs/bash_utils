#!/bin/bash

# Description: This script searches for a file in a directory tree, and uploads it to a rescue server.
# Author: Alm-MarcyF

# Variables
# The directory to search
search_dir=$1
# The file to search for
search_file=$2
# The rescue server
rescue_server=$3

# Check if the search directory exists
if [ ! $search_dir ]; then
    echo "The search directory does not exist."
    exit 1
fi

# Check if the file to search for exists
if [ ! $search_file ]; then
    echo "The file to search for does not exist."
    exit 1
fi

# Check if the rescue server is reachable
ping -c 1 $rescue_server > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "The rescue server is not reachable."
    exit 1
fi

# Search for the file
file_path=$(find $search_dir -name $search_file)
if [ -z $file_path ]; then
    echo "The file was not found."
    exit 1
fi

# Get Content of the file
file_content=$(cat $file_path)

# Upload the file to the rescue server
curl -i -k -X POST -H "Content-Type: application/json" --data "$file_content" http://$rescue_server:8080

# Clear terminal
#clear

# Exit with success
exit 0
