#! /bin/bash

echo "Intalling dependecies for Conway's Game of Life..."

cd server && npm install && cd ../client && npm install
