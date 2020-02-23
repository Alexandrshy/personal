---
template: post
title: >-
  Создаем современное веб приложение. Знакомство с проектом и подготовка к
  работе. Часть 1
slug: build-web-application-1
lang: ru
hasTranslation: true
draft: false
date: 2019-11-17T08:45:00.000Z
tags:
  - react
  - javascript
  - webdev
---
В этой серии статей мы пройдем полный цикл создания клиентской части приложения и напишем небольшую библиотеку компонентов с использованием современного стека технологий.

Я пишу эту статью для начинающих Frontend разработчиков которые хотят создать свой первый JavaScript проект, и показать его всему миру Для этой серии статей я выбрал базовый стек который можно встретить в большинстве современных проектов. Чтобы не заскучать вы всегда можете добавить что-то свое, поэтому я рекомендую вам параллельно чтению статьи писать собственную реализацию и публиковать результаты работы на GitHub. Наверняка у вас есть десяток технологий, библиотек, фреймворков, инструментов, которые хочется попробовать, и разработка такого пет-проекта – это отличный вариант попробовать что-то новое.

## Знакомство с проектом

Основная идея проекта, который мы будем реализовывать – написать библиотеку компонентов на React с TypeScript, документировать и визуализировать ее с помощью Storybook и опубликовать ее как пакет в npm. Также мы настроим линтеры, добавим тесты на Jest, автоматизируем процесс тестирования с помощью Travis CI. Возможно в ходе работы добавится что-то еще, не стесняйтесь комментировать и предлагать свои решения.

Статья будет разделена на несколько частей чтобы мы могли детально рассмотреть каждый этап создания проекта.

## Начало работы

Для начала нам нужно создать репозиторий на GitHub для нашего проекта:

![GitHub repository](https://thepracticaldev.s3.amazonaws.com/i/6bbcunicifswd3r0h9xv.png)

Так выглядит окно создания моего нового репозитория. Вам нужно придумать имя и небольшое описание вашего репозитория. Для всех своих пет-проектов я всегда выбираю публичный тип репозитория, но сейчас GitHub предоставляет возможность бесплатно создавать и приватный репозиторий если ваша команда не больше трех человек. Также я сразу добавил MIT лицензию – это самый простой и распространенный вариант лицензии для Open Source проектов, если вам интересно больше узнать про лицензии можете посмотреть <a href="https://choosealicense.com/">этот сайт</a> созданный GitHub.

Теперь клонируем новый репозиторий. GitHub предлагает клонировать с использованием SSH или HTTPS. Обычно я использую второй способ.

```cmd
git clone https://github.com/Alexandrshy/react-ant.git
```

Если вы видите сообщения об удачной распаковке значит клонирование прошло успешно.

Также нам нужно сразу выполнить кеширование пароля, если это не сделать при следующих попытках сделать git push, git fetch, git clone вам будет необходимо вводить логин и пароль (<a href="https://help.github.com/en/github/using-git/which-remote-url-should-i-use">Подробнее об этом</a>).

```cmd
git config --global credential.helper osxkeychain
```

Переходим к созданию файла package.json. Для этого выполним команду:

```cmd
npm init -y
```

После выполнения команды в репозитории вы можете видеть package.json файл с некоторыми заполненными полями, мой выглядит так:

```javascript
{
  "name": "react-ant",
  "version": "1.0.0",
  "description": "A set of light React components 🐜",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Alexandrshy/react-ant.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/Alexandrshy/react-ant/issues"
  },
  "homepage": "https://github.com/Alexandrshy/react-ant#readme"
}
```

Внесем сразу небольшие изменения:

<source lang="json">
  "keywords": [
    "react",
    "css",
    "UI"
  ],
  "author": {
    "name": "Alex",
    "email": "alexandrshy@gmail.com",
    "url": "https://github.com/Alexandrshy"
  },
  "license": "MIT",
</source>

Я думаю тут все понятно, а для более детальной конфигурации вам может понадобится <a href="https://docs.npmjs.com/files/package.json">эта документация</a>.

Мы еще будем возвращаться к конфигурации package.json в ходе работы над проектом. Но сейчас пришло время сделать первый коммит.

```cmd
git status
git add package.json
git commit -m "Init npm package"
git push
```

В двух словах что мы сделали: проверили историю изменений, проиндексировали измененный package.json, сделали коммит с простым и понятным коммит сообщением и после этого положили наши изменения в удаленный репозиторий. Теперь package.json и информация о новом коммите появились в нашем репозитории. Для работы с Git вы можете использовать IDE или GUI, но мне комфортнее делать все в консоли.

## Линтеры

Чтобы ваш код был чище (это особенно важно если над проектом работает несколько человек) вам обязательно нужен инструмент для анализа и выявления ошибок.  В своих проектах я использую ESLint для проверки JavaScript кода. Он прост в установке и гибко настраиваемый. 

Установим ESLint:

```cmd
npm i -D eslint
```

Настроим конфигурационный файл:

```cmd
./node_modules/.bin/eslint --init
```

Вы можете сконфигурировать ESLint вручную или использовать готовый набор правил. Мне нравится гайд от <a href="https://github.com/airbnb/javascript">Airbnb</a>. Я воспользовался следующими настройками:

```cmd
? How would you like to use ESLint? To check syntax, find problems, and enforce code style
? What type of modules does your project use? JavaScript modules (import/export)
? Which framework does your project use? React
? Does your project use TypeScript? Yes
? Where does your code run? Browser
? How would you like to define a style for your project? Use a popular style guide
? Which style guide do you want to follow? Airbnb (https://github.com/airbnb/javascript)
? What format do you want your config file to be in? JavaScript
```

Так как мы планируем использовать TypeScript я сразу выбрал этот пункт в диалоговом окне, из-за чего получил ошибку <i>Cannot find module 'typescript'</i>, что логично потому что TypeScript мы еще не установили, давайте сразу исправим это:

```cmd
npm i typescript
npm i -D @typescript-eslint/parser
```

После установки у вас появится конфигурационный файл eslintrc. Он уже сконфигурирован, но если в ходе разработки вы захотите добавить или изменить какие-то правила он придет вам на помощь.

Чтобы проверить работу ESLint, давайте создадим файл index.ts и сохраним туда следующий код:

```javascript
var a
console.log("a = " + a)

a = 100
```

И запустим проверку:

```cmd
./node_modules/.bin/eslint index.ts
```

Отлично, код из 5 строк имеет 7 ошибок и 1 предупреждение. И сразу ESLint предлагает мне автоматически исправить эти ошибки, давайте попробуем это сделать:


```cmd
./node_modules/.bin/eslint index.ts --fix
```

И мы получаем такой код, без ошибок и с одним предупреждением о использовании console.log:

```javascript
let a
console.log(`a = ${a}`)

a = 100
```

Как вы можете видеть автоматический фикс работает, ошибки были исправлены, но код все еще выглядит достаточно некрасиво. Для форматирования кода лучшим инструментом на мой взгляд является <a href="https://prettier.io/">Prettier</a>. Давайте добавим его в наш проект:

```cmd
npm i -D prettier-eslint
npm i -D prettier-eslint-cli
```

```javascript
"scripts": {
    "format": "prettier-eslint '**/*.{js,ts,tsx}' --write"
},

```

Я добавил опцию --write чтобы все отформатированный файлы перезаписывались. Проверим результат:

```cmd
npm run format
```

`index.ts`

```javascript
let a
console.log(`a = ${a}`)

a = 100
```

Все отлично работает. Вы также можете установить плагины для своей IDE чтобы форматировать файлы с помощью комбинаций клавиш или при сохранении изменений. Теперь давайте добавим скрипты в package.json:

```javascript
"scripts": {
    "eslint": "./node_modules/.bin/eslint '**/*.{js,ts,tsx}'",
    "eslint:fix": "npm run eslint -- --fix",
    "format": "prettier-eslint '**/*.{js,ts,tsx}' --write"
},
```

Идеальный вариант когда вы начинаете новый проект сразу настроить все линтеры, потому что если вы попытаетесь внедрить их в уже готовый проект вы можете увидеть большое количество ошибок и на их исправление потребуется куда больше времени, чем если бы вы изначально позаботились о качестве вашего кода.

Сохраняем изменения:

```cmd
git add .
git commit -m "Added ESLint and Prettier"
git push
```

## Pre-commit хук

Мы настроили ESLint и Prettier и создали скрипты для запуска вручную, но было бы хорошо делать это автоматически перед коммитом. Для этого мы можем воспользоваться Git хуками. Пакет <a href="https://github.com/typicode/husky">Husky</a> дает возможность запускать скрипты перед выполнением `git commit`, а пакет <a href="https://github.com/okonet/lint-staged">Lint-staged</a> позволяет проверять только индексируемые файлы по определенным фильтрам.

```cmd
npm i -D husky lint-staged
```

Вернемся к package.json и добавим следующий код:

```javascript
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.(js|jsx|ts|tsx)": [
      "npm run eslint:fix",
      "npm run format",
      "git add"
    ]
  },
```

Теперь перед каждый коммитом мы будем запускать проверку ESLint и Prettier для всех измененных js и ts файлов и после форматирования добавлять эти файлы в наш коммит.

Давайте снова протестируем файл index.ts:

```javascript
var a
console.log(`a = ${a}`)

a = 100
```

Только на этот сразу сразу проиндексируем этот файл и сделаем коммит:

```cmd
git add index.ts
git commit -m "Testing pre-commit hook"
```

Если вы сейчас проверите файл index.ts вы увидите, что код был отформатирован. Прежде чем сохранить изменения файл будет будет проверяться и при необходимости форматироваться. Это позволяет быть уверенным в корректности файлов которые попадают в ваш репозиторий.

## Заключение

Нам осталось сохранить все изменения. Перед этим создадим файл .gitignore куда запишем node_modules, нам не нужно чтобы папка с зависимостями попала в наш репозиторий. Также мы можем удалить файл index.ts, он нам в дальнейшем не понадобится.

```cmd
git add .
git commit -m "Added ESLint and Prettier"
git push
```

На этом мы остановимся, всем спасибо за внимание, увидимся в следующих частях.

### Ссылки

- [npm  документация](https://docs.npmjs.com/)
- [ESLint официальный сайт](https://eslint.org/)
- [Prettier-eslint](https://github.com/prettier/prettier-eslint)
- [Prettier-eslint-cli](https://github.com/prettier/prettier-eslint-cli)
- [Prettier расширение для VSCode](https://github.com/prettier/prettier-vscode)
- [Husky](https://github.com/typicode/husky)
- [Lint-staged](https://github.com/okonet/lint-staged)
