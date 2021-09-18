/*

왜 필요한가?

데이터베이스는 데이터를 정형화해서 저장하고, 그 데이터 중에서 필요한 조건에 맞춰서 검색하기 위해서 필수적으로 이해해야 한다. 여러 상업적인 데이터베이스 관리시스템이 있고, 그 동작 방식을 이해해야 한다. 데이터베이스 형태로 데이터를 다루는 방식은 웹 서버, 웹 브라우저 로컬스토리지, 모바일 캐싱 데이터 등으로 활용한다.


학습 목표

데이터베이스 관리시스템 대해 학습하고, SQL 문법을 사용해서 테이블 단위로 관리하고, Record를 생성하고 업데이트하고 삭제하는 방식에 익숙해지는 것이 목표다.

데이터베이스 테이블을 CSV 파일로 저장하고 다루도록 연결한다.

데이터베이스 테이블 관련 리포트 기능을 구현해야 한다.

<br/>

What is database, SQL?

what is data?

data can be facts related to any object inconsideration.
ex) name, age, height, weight
    pic, img, file, pdf


what is database?
data could be random. database is systematic collection of data
data in a database is organized, it makes data management easy.

what is a database management system (DBMS)
DBMS is a collection of programs which enables its users to access
database, manipulate data, help in representation of data.

It also helps control access to the database by various users

1. An online telephone directory would definitely use database management system to store
data pertaining to people, phone numbers, other contact details.

2. electricity service provider uses DBMS to manage billing, client related issues, to handle out fault data

3. facebook needs to store, manipulate and represent data related to members, there friends, memeber activities, messages, ads and lot more.



4 major types of DBMS (database management system)

1. hierarchical
    tree with nodes and braches

2. network DBMS 
    many to many relationships

3. relational dbms 
    in forms of tables = relations 
    usually has predefined data types in supports. most popular dbms. 
    ex) mySQL, oracle, microsoft SQL server.

4. object oriented relation dbms
    support storage of new data types.
    data to be stored is in the form of objects
    objects to be stored in database has attibutes - gender, age + method to define what to do with data
    ex) PostgreSQL 
     
what is SQL?
    structured query language.
    actually the standard language for dealing with relational databases

SQL can be used to
    insert, search, update, delete database records

SQL syntaxes used in these databases are almost similar
select * from members where age > 30

<img width="739" alt="image" src="https://user-images.githubusercontent.com/74404132/129003280-703edfaa-5ce2-437e-bc1d-c520a396e577.png">



CREATE 는 fs.writeFileSync로 생성
DROP 은 fs.unlinkSymc로 삭제

나머지가 문제
그리고 table을 객체에 넣어서 저장해둘지.

Working with CSV in Javascript



*/

import fs from 'fs'
import csv from 'csvtojson'
import { Parser } from 'json2csv'
import { print } from './print.js'
// CREATE TABLE table_name (column1 datatype, column2 datatype, column3 datatype)
// CREATE TABLE billboard (singer String, year Numeric, song String)

(async () => {

    // Load billboard chart
    const billboard = await csv().fromFile("billboard.csv") // load csv to json - converted into js array

    // print(billboard)
    // console.log(billboard)
    // billboard[0].singer = 'Taylor Swift'
    // billboard[0].song = 'Blank Space'

    const billboardInCsv = new Parser({ fields : ['singer', 'year', 'song']}).parse(billboard)
    // input object that has property called fields, pass in  fields.
    // can make them loa dynamically
    fs.writeFileSync("billboard.csv", {'singer':"", 'year':"", 'song':""})
    console.log(billboard)
    

} 
    )(); // 선언과 즉시 한 번만 실행시키도록.

// print(1, 2, 34)