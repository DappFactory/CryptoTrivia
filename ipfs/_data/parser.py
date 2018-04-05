import pandas as pd 
import os
import numpy as np

def parsefile(datafile):
    '''
    Function to parse a .txt quiz file into a formatted csv file

    @params:
    - datafile (str) a filepath string for a .txt file that 
    we want to read in
    '''
    # read in the datafile line by line
    with open(datafile, 'ru') as file:
        x = []
        for l in file:
            lineanswers = np.array([chars.lstrip() for chars in l.strip().split(':')])
            if lineanswers.size == 6:
                x.append(lineanswers)
        x = np.array(x)

    # convert the read in list into a dataframe
    colnames = ['question', 'a', 'b' ,'c', 'd', 'answer']
    quiz_df = pd.DataFrame(np.array(x), columns=colnames)   

    # save this dataframe to a csv file
    quiz_df.to_csv(datafile.split('.')[0]+'.csv')
    return 1

if __name__ == '__main__':
    datafile = os.path.join(os.getcwd(), 'data.txt')
    parsefile(datafile)