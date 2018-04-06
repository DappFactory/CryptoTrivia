import pytest
import parser

RAWFILE = './data.txt' 	# RAW DATA
PROCESSEDFILE = './processed/quiz1.csv' # processed data

class Test_Parse():
	# def __init__(self, filepath=FILEPATH):
	# 	self.filepath = filepath

	def test_parsefile(RAWFILE):
		# check returns when file valid
		assert parser.parsefile(RAWFILE) == 1

		# check returns when file empty or none
		with pytest.raises(AttributeError):
			parser.parsefile()
		with pytest.raises(AttributeError):
			parser.parsefile('')

		# check returns when file is not valid
		with pytest.raises(ValueError):
			parser.parsefile(PROCESSEDFILE)