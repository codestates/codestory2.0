const tips = [
	{ 
		command: 'pwd',
		description1: '현재 위치한 폴더의 절대주소를 확인할 수 있습니다.',
		example: '$ pwd'
	},
	{
		command: 'mkdir',
		description1: 'making directory를 의미합니다.',
		description2: '[mkdir 폴더이름] 으로 임의의 폴더를 생성할 수 있습니다.',
		example: '$ mkdir github'
	},
	{
		command: 'ls',
		description1: '현재 폴더 안의 파일들과 하위 폴더들을 확인할 수 있습니다.',
		description2: '[ls -a] 옵션을 입력하면 숨겨진 파일을 확인할 수 있습니다.',
		example: '$ ls, $ ls -a'
	},
	{
		command: 'cd',
		description1: 'change directory를 의미합니다.',
		description2: '[cd 들어갈폴더] 로 원하는 폴더로 들어갈 수 있습니다.',
		description3: '절대 경로와 상대 경로 모두 사용할 수 있습니다.',
		description4: '[cd ..] 로 상위폴더로 이동할 수 있습니다.  ',
		example: '$ cd github, $ cd ..'
	},
	{
		command: 'touch',
		description1: '[touch 원하는파일이름.확장자] 로 파일을 생성할 수 있습니다. ',
		example: '$ touch hello.txt'
	},
	{
		command: 'cat',
		description1: '[cat 파일이름.확장자] 로 파일의 내용을 확인할 수 있습니다.',
		example: '$ cat hello.txt'
	},
	{
		command: 'rm',
		description1: '파일이나 폴더를 삭제할 때 rm 명령어를 사용합니다.',
		description2: '[rm 삭제할파일이름.확장자] 로 파일을 삭제할 수 있습니다.',
		description3: '폴더를 삭제할 때는 옵션을 사용해야 합니다.',
		description4: '[rm -r 삭제할폴더이름], [rm -rf 삭제할폴더이름] 으로',
		description5: '폴더를 삭제할 수 있습니다.',
		example: '$ rm hello.txt, $ rm -r github, $ rm -rf temp'
	},
	{
		command: 'mv',
		description1: '[mv 이동할파일이름.확장자 도착할폴더이름] 으로',
		description2: '원하는 파일을 이동할 수 있습니다.',
		description3: '[mv 이동할폴더이름 도착할폴더이름] 으로',
		description4: '폴더를 이동할 수 있습니다.',
		example: '$ mv hello.txt temp, $ mv temp1 temp'
	},
	{
		command: 'mv',
		description1: '[mv 기존의파일이름.확장자 변경하고싶은파일이름.확장자] 로',
		description2: '파일이름을 변경할 수 있습니다.',
		description3: '[mv 기존의폴더이름 변경하고싶은폴더이름] 으로',
		description4: '폴더이름을 변경할 수 있습니다.',
		example: '$ mv hello.txt hi.txt, $ mv temp temp1'
	},
	{
		command: 'cp',
		description1: '폴더나 파일을 복사할 때 cp 명령어를 사용할 수 있습니다.',
		description2: '[cp 원본파일이름.확장자 복사할파일이름.확장자] 로 ',
		description3: '복사할파일에 이름을 지정할 수있습니다.',
		description4: '폴더복사는 [cp -r 원본폴더이름 복사할폴더이름],',
		description5: '[cp -rf 원본폴더이름 복사할폴더이름] 으로',
		description6: '복사할폴더에 이름을 지정할 수 있습니다.',
		example: '$ cp -rf temp temp1'
	},
]; 

export default tips;