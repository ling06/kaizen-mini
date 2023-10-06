Для развертывания проекта надо сначала добавиться в проект на гитхабе, затем клонировать проект:
~~~
git clone git@github.com:ling06/kaizen-mini.git
~~~

Затем надо скопировать все файлы из папки /development в корень проекта.  
В /config/db.php настроить доступы к БД.

Затем в консоли в директории проекта последовательно выполнить следующие команды.

Для установки зависимостей:
~~~
composer install
# или php composer.phar install
~~~

В mysql создать БД kaizen:
~~~
mysql -u root -p
create database kaizen;
exit;
~~~

Для создания структуры БД:
~~~
php yii migrate
~~~

Для создания структуры хранения ролей и разрешений:
~~~
php yii migrate --migrationPath=@yii/rbac/migrations
~~~

Для прописывания разрешений:
~~~
php yii auth/init
~~~