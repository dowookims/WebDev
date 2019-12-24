# Quest 00. Hello, git

## 1. 버전 관리(Version Control) 이란?
버전 관리 시스템(Version Control System, VCS)은 파일 변화를 시간에 따라 기록했다가 나중에 특정 시점의 버전을 다시 꺼내올 수 있는 시스템이다.

버전 관리 시스템의 장점은 다음과 같다.

* VCS를 사용하면 각 파일을 이전 상태로 되돌릴 수 있다.
* 프로젝트를 통째로 이전 상태로 되돌릴 수 있다.
* 시간에 따라 수정 내용을 비교해 볼 수 있다.
* 누가 문제를 일으켰는지도 추적할 수 있고, 누가 언제 만들어낸 이슈인지도 알 수 있다.
* VCS를 사용하면 파일을 잃어버리거나 잘못 고쳤을 때도 쉽게 복구할 수 있다.
* 이런 모든 장점을 큰 노력 없이 이용할 수 있다.

### 1) 버전 관리 방식

#### (1) 로컬 버전 관리

간단한 데이터베이스를 사용하여 파일의 변경 정보를 관리하는 방법.

![Local Version Control](https://git-scm.com/book/en/v2/images/local.png)

VCS 도구 중, RCS(Revision Control System)이 있다. 이는 기본적으로 Patch Set(파일에서 변경되는 부분)을 관리하며, 이 Patch Set은 특별한 형식의 파일로 저장한다. 그리고 일련의 Patch Set을 적용해서 모든 파일을 특정 시점으로 되돌 릴 수 있다.

#### (2) 중앙 집중식 버전 관리(CVCS)

다른 개발자와 협업하기 윟해 개발된 관리 방법. CVS, Subversion, Perforce와 같은 시스템은 파일을 관리하는 서버가 별도로 있고, 클라이언트가 중앙 서버에서 파일을 받아 사용(Checkout) 한다.

![CVCS](https://git-scm.com/book/en/v2/images/centralized.png)

CVCS를 사용함으로써 local VSC 보다 더 많은 이점을 가지게 됬는데 이는,

* 누가 무엇을 하고 있는지 모두다 알 수 있다.
* 관리자가 개발자들을 관리하기 수월해졌다.
* 모든 클라이언트의 local DB를 관리하는 것 보다 VSC 하나를 관리하는게 쉽다.

그러나, 이 CVCS도 단점을 가지고 있는데, 가장 대표적인 문제가 중앙 서버에서 문제가 발생했을 때 이다.

#### (3) 분산 버전 관리 시스템(DVCS)

Git, Mecurial, Bazaar, Darcus등 DVCS에서 클라이언트는 저장소를 모든 히스토리를 포함하여 복제한다. 서버에 문제가 생길 시 이 복제물로 다시 작업을 진행 할 수 있다.

![DVCS](https://git-scm.com/book/en/v2/images/distributed.png)

대부분의 DVCS 환경에서는 리모트 저장소가 존재하기에 동시에 다양한 그룹과 다양한 방법으로 협업이 가능하다. 또한 리모트 저장소의 수도 다양 할 수 있기에, CVCS 보다 더 다양한 워크플로를 활용하여 개발을 진행 할 수 있다.

#### (4) Git 과 Mercurial

##### 개요

Git과 Mercurial은 DVCS라는 비슷한 철학을 가지고 있다. 가볍고, 규모 확장이 쉬운 VCS. 특히 변경에 대한 이력을 비선형 구조로 나타내며, 복수의 부모 및 자식의 변경을 표시하는 그래프로 나타낸다.

##### 차이

###### Git

* 병렬 브랜치를 전제로 설계
* C와 bsh(Bourne Shell), Perl을 이용하여 작성
* Linux 친화적
* Shell Script 사용 가능
* C 사용하지 안항도 명령 확장 가능

###### Mercurial

* 쉬운 사용을 위해 많은 노력을 진행하였다.
* 파이썬을 이용하여 작성
* Windows 환경에서 더 나은 성능을 보여줌
* Python 코드나 명령어를 이해하지 못하면 확장 명령 만들기가 git에 비해 어려움

##### 사용성

Mercurial은 종합 공구 세트, Git은 맥가이버 칼에 비교를 함.

###### Git

* 필수적인 기능 세트를 컴팩트한 형태로 만들어짐
* 기능의 종류도 적고 기본적인 기능만 제공
* 셸 스크립트를 활용햏 기본 명령 확장 및 새로운 명령 만들기 용이
* Mercurial에 비해 조금 더 많은 설정이 필요하다.

###### Mercurial

* 잘 정리된 별칭이 미리 만들어 져 있으며, 대부분의 경우 설정 없이, 또는 사용자 이름 설정으로 바로 시작 할 수 있는 환경 제공

##### 저장소의 구성

###### Git

* 스냅샷 기반 저장소. 모든 변경이나 파일을 포함하는 댓상은 Object로 푷현되며, Object 종류에는 Commit, Tree, BLOB, Tag 등이 존재.
* BLOB은 Leaf 노드로 실제 관리되는 파일이 여기에 들어간다. 그 외의 오브젝트는 다른 오브젝트를 참조하는 형식으로 트리 구조를 만든다.
* BLOB에서의 관리 대상은 특정 시점의 파일 전체 내용.
* 그래서 Git의 저장소는 크기가 빠른 속도로 증가
* 이를 해결하기 위해 gc 명령을 제공한다.
* gc 명령을 수행하면서 접근 불가능한 브랜치는 삭제하고, 오래된 변경 집합(Changeset)은 diff 형태의 파일을 압축한 형태로 저장하여 저장소 효율을 높인다.

###### Mercurial

* 각 파일별 변경분만 추적한다.
* 저장소에는 실제 관리 대상이 되는 파일의 트리 구조와 동일한 형태의 .i를 확장자로 하는 변경 기록용 파일이 존재
* 그 파일에는 해당 파일이 가리키고 있는 파일의 변경 이력이 바이너리(binary) 형태로 저장.
* 그로 인해 저장소는 변경분에 비례해서 증가하게 되며, 일반적으로 Git에 비해 완만한 속도로 저장소의 크기가 증가한다.
* 별도의 저장소에 대한 관리 작업이 필요하지 않음.
* 패치(patch)의 생성이나 변경 이력의 추적에는 Git에 비해서 용이
* 스냅샷의 생성이나 업데이트, 커밋(Commit) 작업에는 대부분의 경우 Git에 비해서 높은 비용을 요구

##### 성능

###### Git

* 프로젝트의 규모에 비례하여 저장소의 규모가 상당히 빠른 속도로 증가
* 스냅샷 기반이므로 대규모의 프로젝트에서도 일정한 성능을 유지
* 대체적으로 Mercurial 보다 빠름

###### Mercurial

* 저장소의 규모가 Git에 비해 완만하게 선형적으로 증가.
* 차이점 기반이며 디스크 I/O가 적으므로, 대량의 읽기/쓰기가 발생하는 상황에서도 비교적 안정적
* 프로젝트 규모가 커지고, 변경 이력이 쌓일 수록 패치를 병합하는 비용이 증가

### 2) Git의 기초

#### 1) 스냅샷을 취급한다

Subversion과 같은 CVCS 은 큰틀에서 관리하는 정보들이 대부분 파일들의 목록이다. 시스템은 각 파일의 변화를 시간순으로 관리하며, 파일들의 집합을 관리한다(이를 델타 기반 버전관리 시스템 이라 함)

그러나 Git은 데이터를 파일 시스템 스냅샷의 연속으로 취급하며, 크기가 작다. Git은 커밋하거나 프로젝트의 상태를 저장할 때 마다 파일이 존재하는 그 순간을 중요하게 여기기에, 파일이 달라지지 않으면 성능을 위해 파일을 새로 저장하지 않고 이전 상태의 파일에 대한 링크만 저장한다.

#### 2) Git의 세 가지 상태

![Git status](https://git-scm.com/book/en/v2/images/areas.png)

* Working Directory : 프로젝트의 특정 버전을 Checkout한 것.
  * working directory의 모든 파일은 Tracked(관리대상임) 과 Untracked(관리 대상이 아님)으로 나눈다.
  * Tracked 파일의 경우 이미 snapshot 에 포함된 파일을 말한다
    * Unmodified : 수정하지 않음
    * Modified : 수정함
    * Staged : 커밋하면 파일에 저장 됨
* Staging Area : Git 디렉터리에 있다. 단순한 파일이며, 곧 커밋할 파일에 대한 정보를 저장한다.
* commited : 데이터가 로컬 DB에 저장 됨
* Modified : 수정 파일을 아직 로컬 데이터베이스에 커밋하지 않음
* Staged : 현재 수정한 파일을 곧 커밋할 것이라 표시한 상태

### 3) Git 의 명령어

#### 1) git init

`git init`은 프로젝트 디렉토리에 `.git` 이라는 하위 디렉토리를 만든다. 이 `.git`안에는 저장소에 필요한 Skeleton File들이 들어 있다.

#### 2) git clone

`git clone` 은 다른 프로젝트에 참여하거나, Git repository를 복사할 때 사용한다.

```git
git clone https://github.com/dowookims/JS.git
```
를 하면 `JS`라는 이름으로, 현재 위치에 디렉토리가 생성된다. 이는

```git
git clone https://github.com/dowookims/JS.git practiceRepo
```

라고 할 경우 `practiceRepo`라는 이름으로 위 url에 있는 repository가 복사된다.

#### 3) git add

* `git add 대상`으로 파일을 추적할 수 있게 한다. 즉, untracked file을 tracked로.
* 또한, Tracked 지만, 아직 `staged`되지 않은 경우에도 이 명령어를 사용해야 한다.

#### 4) git commit

현재 컨텐츠의 인덱스와, 변화한 부분에 대한 로그가 담긴 커밋을 새로 만든다. 새 커밋은 `HEAD`의 자식이 된다.

커밋할 컨텐츠는 다음과 같은 여러 가지 방법으로 지정할 수 있다.

1. 커밋 command를 사용하기 전에 `git add`를 사용하여 인덱스에 점진적으로 "추가" 변경사항 적용
2. commit command 입력 전에 `git rm`을 사용하여 파일을 워킹 트리 또는 인덱스에서 지웠을 경우

* `git commit -v` diff 메시지를 포함하여 커밋을 작성한다
* `git commit -m 메시지` commit 메시지를 인라인으로 작성한다.
* `git commit -a`는 Tracked 상태의 파일을 자동으로 Staging Area에 넣는다.
* `git commit --ammend` 는 이전에 했던 커밋을 수정할 때 사용한다. 이 명령은 `Staging area`를 사용하여 커밋한다.
  * Staging Area에 수정된 사항이 없으면 commit message만 수정한다.

#### 5) git push



#### 6) git pull



#### 7) git branch



#### 8) git stash


#### 9) git diff

Staged와 Unstaged 상태의 변경 내용을 보기 위해 사용한다. 단순히 파일이 변경되었음을 확인하는게 아니라, 어떤 내용이 변경되었는지 확인 할 때 사용한다.
* `git diff` 수정했지만 아직 staged 상태가 아닌 파일을 비교 해 볼 수 있다.
* `git diff --cached` or `git diff --staged` 워킹 디렉터리와 Staging area를 비교한다

#### 10) git log

저장소의 히스토리를 볼 때 사용한다. 특별한 args 없이 사용하면 커밋 히스토리를 시간순으로 보여준다.
* `git log -p` 각 커밋의 diff 결과를 보여준다.
* `git log --stat` 각 커밋의 통계 정보를 조회할 수 있다. 어떤 파일이 수정됐는지, 얼마나 많은 파일이 변경됐는지 등.
* `git log --graph` : 커밋이력을 그래프화 하여 볼 수 있다.
* `git log pretty` log의 내용을 보여줄 때 기본 형식 이외에 다른 옵션을 선택 할 수 있게 한다.
  * `oneline` : commit message
  * `short` : `oneline` + authtor
  * `full` : `short` + Commit 이력을 남긴 사람
  * `fuller` : `full` + Author date, Commit Date
  * `format` : 사용자가 지정해서 로그 형식을 만들 수 있다

```bash
git log --pretty=oneline
git log --pretty=format:"%h - %an, %ar : %s"
```

***
참고 자료

[Git](https://git-scm.com/book)

[Naver D2](https://d2.naver.com/helloworld/1011)
