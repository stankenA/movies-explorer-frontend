# Фронтенд проекта Movies Exlorer 

Представляет собой сервис по поиску фильмов с возможностью их сохранения. 

![image](https://github.com/stankenA/movies-explorer-frontend/assets/82235915/baf069fc-b238-455c-92a4-bd933329e3ca)


## Описание 

В приложении реализован следующий функционал:
- реализованы авторизация и регистрация пользователей
- роуты `/movies`, `/saved-movies`, `/profile` защищены авторизацией с помощью HOC
- все формы валидируются на стороне клиента при каждом изменении инпутов
- возможность редактирования профиля в личном кабинете
- реализованы запросы к двум видам API: внешнему (для получения массива фильмов) и собственному (для регистрации/авторизации и сохранения фильмов)
- реализован поиск фильмов по ключевым словам и состоянию чекбокса
- для разных устройств отображается разное количество максимально видимых карточек фильмов. Нажатие на кнопку "Ещё" показывает определённое количество дополнительных карточек в видимый массив
- реализована возможность сохранять и удалять фильмы
- аналогично реализован поиск и фильтрация по уже сохранённым фильмам

## Технологии

1. Адаптивная вёрстка с помощью HTML5 и Sass/SCSS
2. Использование методологии БЭМ
3. Приложение было собрано с помощью CRA (Create React App)
4. Был использован компонентный подход с использованием различных технологий React, таких как использование различных хуков, контекста, поднятие стейта, компоненты высшего порядка
5. Была использована библиотека маршрутизации React Router для создания маршрутов, их защиты, а также переадресации пользователя

### Инструкция по развёртыванию: 

1. Клонируйте данный репозиторий локально на своё устройство
2. Установите зависимости при помощи команды `npm i`
3. Запустите проект с помощью команды `npm run start`

> Для корректной работы приложения локально установите бэкенд версию, следуя инструкции по ссылке: https://github.com/stankenA/movies-explorer-api


### Ссылки

- Ссылка на макет: https://disk.yandex.ru/d/tYi4iNLoz4Mj8Q
- Ссылка на бэкенд версию: https://github.com/stankenA/movies-explorer-api

- Ссылка на задеплоиный фронтенд на сервере: https://movies-exporer.nomoredomains.rocks (временно недоступно)
- Публичный IP-адрес сервера: 84.201.135.206
