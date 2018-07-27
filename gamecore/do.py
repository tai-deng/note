# -*- coding: utf-8 -*-

import os
import shutil
import datetime



#checkout gamecore
def checkout():
    svn_file_path = os.path.realpath(__file__);
    cur_path = os.path.dirname(svn_file_path);
    print("target dir is " + cur_path);

    #delelte all files
    files = os.listdir(cur_path);

    for the_file in files:
        if the_file == "." or the_file == ".." or the_file == "do.py":
            continue;
        
        the_file_path = os.path.join(cur_path, the_file);
        print("to delete file or dirctory:" + the_file_path)
        if os.path.isdir(the_file_path):
            #if is dirctory
            shutil.rmtree(the_file_path, ignore_errors=True)
        else:
            os.remove(the_file_path);


    #for svn
    print("Please input username:")
    username = raw_input();
    print("Please input password:")
    pwd = raw_input();


    #delete svn.py
    os.remove(svn_file_path);
    #download from service
    # os.system("svn checkout --username %s --password %s 'https://182.92.177.5/svn/gamecore/ts/' ." % (username, pwd));
    os.system("svn checkout --username %s --password %s 'https://182.92.177.5/svn/gamecore/test/assets/Script/gamecore/' ." % (username, pwd));


#submit gamecore
def submit():
    cur_path = os.path.dirname(os.path.realpath(__file__));
    print("target dir is " + cur_path);

    #for svn
    print("Please input username:")
    username = raw_input();
    print("Please input password:")
    pwd = raw_input();
    print("Please input commit info:(Optional)")
    info = raw_input();
    if info == "":
        info = datetime.datetime.today().strftime('%Y-%m-%d') + " by svn.py";

    #submit to service
    os.system("svn add --force * --auto-props --parents --depth infinity -q");
    os.system("svn commit --username %s --password %s -m '%s by svn.py'" % (username, pwd, info));


#create document
def createDocument():
    #submit to service
    os.system("typedoc --ignoreCompilerErrors --out ../../../../doc/gamecore managers/GameManager.ts xiaoyaoji/AdButton.ts wechat/WXRewardVideoAd.ts wechat/WXBannerAd.ts");
    # os.system("typedoc --ignoreCompilerErrors --excludePrivate --out ../../../../doc/gamecore managers/GameManager.ts xiaoyaoji/AdButton.ts wechat/WXRewardVideoAd.ts wechat/WXBannerAd.ts");


print("==================================");
print("Version:1.0");
print("==================================");
print("Please input action number:")
print("1.Update")
print("2.Commit")
print("3.Create Doc")
do_what = raw_input();
if do_what == "1":
    checkout();
elif do_what == "2":
    submit();
elif do_what == "3":
    createDocument();
