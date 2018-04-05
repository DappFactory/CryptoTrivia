#!/bin/bash

quizfile='_data/data.csv'

# start the daemon process and add file
ipfs daemon
ipfs add $quizfile

