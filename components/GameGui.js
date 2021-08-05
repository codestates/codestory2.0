import { Link } from 'next/link';

export default function GameGui({ wd }) {

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
    <div className="container">
      <div className="box">
        <div className="titlebar">
          <span className="titlebar-title">folder</span>
          <span className="titlebar-workingdirectory">{ wd }</span>
          <div className="close">&times;</div>
        </div>
        <div className="gui">
          <div className="left">
            <div className="directory">
              Recent <br/>
              Home <br/>
              Desktop <br/>
              Documents <br/>
            </div>
          </div>
          <div className="right">
            {
              guiHash[stage]
                .map(([fileName, type], idx) => {
                  if (idx < 9) {
                    return (
                      <div className="filebox" key={idx}>
                        <img className="file-img" src={{ folder: 'folder_icon.png', file: 'file_icon.png' }[type]} alt="file icon"/>
                        <div className="filename">{fileName}</div>
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