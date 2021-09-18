/*
Class Vmgit{

};
*/

console.log('outside vmgit')

function CreateFile(name, date, date) {
    this.name = name
    /*
    Create
    Add
    commit message
    */
  };

  var file = {
    name: "nm",   
    date: "2021-07-30-13-32",
    fullId: function() { 
        return this.name+ this.date;
    }
};

  


exports.logManager = function logManager(){
    let newfile = new CreateFile('nm', '2021-07-30-13-32', 'data');
    console.log(newfile)

    // struct stat {
    //     dev_t     st_dev;     /* ID of device containing file */
    //     ino_t     st_ino;     /* inode number */
    //     mode_t    st_mode;    /* protection */
    //     nlink_t   st_nlink;   /* number of hard links */
    //     uid_t     st_uid;     /* user ID of owner */
    //     gid_t     st_gid;     /* group ID of owner */
    //     dev_t     st_rdev;    /* device ID (if special file) */
    //     off_t     st_size;    /* total size, in bytes */
    //     blksize_t st_blksize; /* blocksize for file system I/O */
    //     blkcnt_t  st_blocks;  /* number of 512B blocks allocated */
    //     time_t    st_atime;   /* time of last access */
    //     time_t    st_mtime;   /* time of last modification */
    //     time_t    st_ctime;   /* time of last status change */
    // };


    

    console.log("func")
    /*
    input ()
    switch (){

    }
    */
}




exports.module_name = 'vmgit.js'  //


/*
including distributed versioning architecture and how servers relate to one another in this architecture. 

P4V’s DVCS functionality allows users to create personal servers and submit changes locally without the need to connect or set up a remote server. If the user wishes to clone, fetch or push assets from a remote server, that server must meet the minimum version of 2016.2.1487173 and be set up to accept DVCS commands.

git is working internally (all about the SHA1, blobs, references, trees, commits, 


it references the content of a file as a SHA1 value, so it's able to know if a specific content has changed just comparing the hash values. But my question is specifically about how git checks that the content in the working tree has changed or not.

The naive approach will be thinking that each time you run a command as git status or similar command, it will search through all the files on the working directory, calculating the SHA1 and comparing it with the one that has the last commit. But that seems very inefficient for big projects, as the Linux kernel.

Another idea could be to check last modification date on the file, but I think git is not storing that information (when you clone a repository, all the files have a new time)

Git’s index maintains timestamps of when git last wrote each file into the working tree (and updates these whenever files are cached from the working tree or from a commit). You can see the metadata with git ls-files --debug. In addition to the timestamp, it records the size, inode, and other information from lstat to reduce the chance of a false positive.

When you perform git-status, it simply calls lstat on every file in the working tree and compares the metadata in order to quickly determine which files are unchanged. This is described in the documentation under racy-git and update-index.
*/

