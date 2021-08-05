import styles from './gamegui.module.css';
import Image from 'next/.image';

export default function GameGui({ stage, wd }) {

  const guiHash = {
    '0': [],
    '1': [['', 'folder'], ['', 'folder'], ['', 'folder'], ['', 'folder'], ['', 'folder'], ['', 'folder'], ['', 'folder'], ['open_me', 'folder'], ['read_me', 'file']],
    '2': [['', 'folder'], ['', 'folder'], ['', 'folder'], ['', 'folder'], ['', 'folder'], ['', 'folder'], ['', 'folder'], ['open_me', 'folder'], ['read_me', 'file']],
    '3': [['', 'folder'], ['', 'folder'], ['', 'folder'], ['', 'folder'], ['', 'folder'], ['', 'folder'], ['', 'folder'], ['open_me', 'folder'], ['read_me', 'file']],
    '4-1': [],
    '4-2': [['바보', 'folder']],
    '5': [['code_story', 'folder']],
    '6-1': [],
    '6-2': [],
    '6-3': [],
    '7-1': [['error', 'file']],
    '7-2': [['error', 'file']],
    '8':[],
    undefined: []
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.titlebar}>
          <span className={styles.titlebar_title}>folder</span>
          <span className={styles.titlebar_workingdirectory}>{wd}</span>
          <div className={styles.close}>&times;</div>
        </div>
        <div className={styles.gui}>
          <div className={styles.left}>
            <div className={styles.directory}>
              Recent <br/>
              Home <br/>
              Desktop <br/>
              Documents <br/>
            </div>
          </div>
          <div className={styles.right}>
            {
              guiHash[stage]
                .map(([fileName, type], idx) => {
                  if (idx < 9) {
                    return (
                      <div className={styles.filebox} key={idx}>
                        <Image className={styles.file_img} src={{ folder: 'folder_icon.png', file: 'file_icon.png' }[type]} alt="file icon"/>
                        <div className={styles.filename}>{fileName}</div>
                      </div>
                    );
                  }
                })
            }
          </div>
        </div>
      </div>
    </div>
  );
}; 