export default function GameGui() {

  return (
    <div className="container">
      <div className="box">
        <div className="titlebar">
          <span className="titlebar-title">folder</span>
          <span className="titlebar-workingdirectory">{wd}</span>
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
          </div>
        </div>
      </div>
		</div>
  );
}; 