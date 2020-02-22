# vidya
```
This project consists of three users:
•	Admin
•	Student
•	Professor
```
```
The admin has the following functionalities:
•	He can add a course
•	He can add a student
•	He can add a professor
•	He can also add and delete announcements
```
```
The student has the following functionalities:
•	In the student home page each student can view his/her profile details
•	In the side bar four options are given
1.One option is to view all the general courses. The student can add courses also using this page.
2.Second is an option for the student to view in the courses already enrolled by him/her. Here the student also gets access to download the resources pertaining to the particular course he or she has enrolled to.
3.Thirdly the student can view the announcements that have been uploaded by the admin.
4.Fourthly the student can also access the FAQ section where some pre-defined questions and answers are being provided.
 ```
The professor has the following functionalities:
•	In the professor home page each professor can view his/her profile details.
•	In the side bar four option are given
	One option is to view the courses assigned to the professor. In case no courses have been assigned to him/her it will display “no course” else it displays all the courses that are assigned to the professor and also it provides a professor to add course materials for any particular course he is assigned to.
	Second option allows a professor to view all the students who are enrolled under him.
	 Thirdly the professor can view the announcements that have been uploaded by the admin.
	Fourthly the student can also access the FAQ section where some pre-defined questions and answers are being provided.
The different modules assigned with the project:
1.	index.js		
The start-point of the project. All the requests are received through this file.

2.	connect.js
This file handles all the SQL operations taking place in the project.
3.	find_files.js
This file helps us to find all the files in a given folder.
4.	mkdir.js
This file helps us to make a new folder.
5.	news.js
This file helps us to read , write and update various json files as and when required in the project.



1.The framework used:express
2.Template:pug
3.Backend:Sql
4.JSON files are also used for information retreival.
This project has made use of promises for sql queries.
fs module is used for file reading.
formidable module is used to retrieve the uploaded files through forms.
