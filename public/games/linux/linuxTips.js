const tips = [
  { 
    command: 'pwd',
    description1: '유래: print working directory',
    description2: '현재 폴더의 절대주소, 폴더경로 확인',
    description3: '[cd 절대주소] 해당폴더 이동가능',
    example: '$ pwd'
  },
  {
    command: 'mkdir',
    description1: '유래: making directory',
    description2: '[mkdir 이름] 폴더생성',
    description3: '생성 후 ls 명령어로 확인가능',
    example: '$ mkdir temp'
  },
  {
    command: 'ls',
    description1: '유래: list directory contents',
    description2: '현재 폴더 안의 파일들과 하위 폴더들 확인',
    description3: '[ls -a] 숨겨진 파일 확인',
    example: '$ ls, $ ls -a'
  },
  {
    command: 'cd',
    description1: '유래: change directory',
    description2: '[cd 폴더경로] 해당 폴더 경로로 이동',
    description3: '절대 경로와 상대 경로 모두 사용가능',
    example: '$ cd temp, $ cd ..'
  },
  {
    command: 'touch',
    description1: '현재 시간으로 파일의 최근 사용시간 변경',
    description2: '[touch 이름.확장자] 파일이 있으면 시간변경',
    description3: '[touch 이름.확장자] 파일이 없으면 파일 생성',
    example: '$ touch hello.txt'
  },
  {
    command: 'cat',
    description1: '유래: concatenate / catenate',
    description2: '[cat 이름.확장자] 파일의 내용 확인',
    description3: '파일이름을 인자로 내용을 이어주는 역할',
    example: '$ cat hello.txt'
  },
  {
    command: 'rm',
    description1: '유래: remove',
    description2: '[rm 이름.확장자] 해당파일 삭제',
    description3: '[rm -r 폴더이름] 해당폴더 삭제',
    example: '$ rm hello.txt, $ rm -r temp'
  },
  {
    command: 'mv',
    description1: '유래: move',
    description2: '[mv 파일이름.확장자 도착폴더이름] 파일 이동',
    description3: '[mv 폴더이름 도착폴더이름] 폴더 이동',
    example: '$ mv hello.txt temp, $ mv temp1 temp'
  },
  {
    command: 'mv',
    description1: '유래: move',
    description2: '[mv 파일이름.확장자 변경파일이름.확장자] 파일이름 변경',
    description3: '[mv 폴더이름 변경폴더이름] 폴더이름 변경',
    example: '$ mv hello.txt hi.txt, $ mv temp temp1'
  },
  {
    command: 'cp',
    description1: '유래: copy',
    description2: '[cp 파일이름.확장자 복사파일이름.확장자] 파일 복사',
    description3: '[cp 파일이름.확장자 폴더] 폴더에 파일 복사',
    example: '$ cp -rf temp temp1'
  },
]; 

export default tips;