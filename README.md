# graphql에 대해 공부합니다.

- RESTful API와는 다릅니다.
- 하나의 엔드포인트에서 모든 요청을 처리합니다.
    - 다만 resolver가 필요합니다. (어떤 쿼리, 뮤테이션인지 서버사이드에서 해석하고, 요청한 필드들에 대한 응답을 제공)

- 스키마를 작성해야 한다.

- Express graphql 타입들..
    - Int : 32bit Integer
    - Float : 부호있는 부동소수점값
    - String : UTF-8 문자열
    - Boolean : true 혹은 false