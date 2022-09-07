# Nodejs_express

# '기능 설명'

# postman을 이용하여 url 변경해주세요

---

## • 회원 목록을 보여주기

### GET localhost:4000/users

## • 특정 회원 정보 보여주기

### GET localhost:4000/users/:id

## • 회원 추가하기

### POST localhost:4000/users?id=test&name=test

## • 회원 수정 테스트 URL

### PUT localhost:4000/users/klaus?id=test&name=test

## • 회원 삭제 테스트 URL

### DELETE localhost:4000/users/1

---

## 'posts.js 서비스 내용'

## • 글 전체 목록 조회

### GET localhost:4000/posts

## • 특정 title 을 가진 글 조회

### GET localhost:4000/posts/:title

## • 새로운 글 작성

### POST localhost:4000/posts?title=title&content=content

## • 특정 title 을 가진 글 수정

### PUT localhost:4000/posts/:title?title=title&content=content

## • 특정 title 을 가진 글 삭제

### DELETE localhost:4000/posts/:title

---
