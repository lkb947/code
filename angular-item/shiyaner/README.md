# Shiyaner

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# 项目目标

  1.熟悉基于JWT的身份认证机制
  2.学会使用angular的HttpClient 实现身份认证；

  二、实验内容
  1）构建一个登录页面，要求用户输入用户名和密码，提交到后台API进行验证；
  2）验证成功返回一个JWT，验证失败返回一个状态码为 401 的HTTP响应；
  3）获得JWT后，在后续的API请求中，将JWT放入HTTP请求头中发起请求；
