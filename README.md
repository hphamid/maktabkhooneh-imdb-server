# کد سرور پروژه پایانی 

## توضیحات
<div dir="rtl">
این پروژه یک سرور ابتدایی برای استفاده در اپلیکیشن پیاده سازی شده در اپلیکیشن مکتب خونه است که با استفاده از خدمات
<a href="https://www.backtory.com/">
بکتوری
</a>
کار می‌کند و قابلیت اجرا به صورت لوکال و یا هاست شده بر روی سرورهای بکتوری را داراست.
</div>
<div dir="rtl">
برای مشاهده‌ی اطلاعات endpoint ها می‌توانید از فایل swagger تولید شده در آدرس src/generatedSwagger.json استفاده کنید.
 <br>
 لازم به ذکر است که تمامی اطلاعات ارسالی به سرور لازم است که در بادی ریکویست و به صورت json باشند و در فایل swagger تولید شده صرفا برای سادگی خوانایی بیشتر در پارامترها ذکر شده‌اند.
</div>

## تنظیمات اولیه
<div dir="rtl">
برای اجرا کردن پروژه چه به صورت لوکال و یا بر روی سرورهای بکتوری لازم است که ابتدا در فایل src/config.json اطلاعات معلوم شده با <<>> را وارد کنید.
</div>

```javascript
//application specific config file
let config = {};

config.authInstanceId = "<<X-Backtory-Authentication-Id>>";
config.objectSorageInstanceId = "<<X-Backtory-Object-Storage-Id>>";
config.integratedMasterKey = "<<X-Backtory-Authentication-Key (Master)>>";
config.clientKey = "<<X-Backtory-Authentication-Key (Client)>>";
config.cloudCode = "<<Cloud-Code-Id>>";
config.cdnInstanceId = "<<X-Backtory-Storage-Id>>";

config.baseUrl = "http://storage.backtory.com/<<cdn address>>";


config.lambdaHeaders =
    {
        'x-backtory-authentication-id': config.authInstanceId,
        'x-backtory-cache-mode': "No-Cache"
    };
module.exports = config;
```

<div dir="rtl">
سپس باید دستورات زیر را در ترمینال وارد کنید:
<div>

```bash
cd /path/to/project/api
npm install
cd /path/to/project/src
npm install
cd ..
node preCompile.js
```

## اجرا کردن به صورت لوکال
<div dir="rtl">
برای اجرای کد بر روی کامپیوتر خود لازم است پس از اجرا کردن مراحل اولیه که پیش از این توضیح داده شده است دستورات زیر را وارد کنید:
</div>

```bash
cd /path/to/project
node api/api.js
```

## سرور
<div dir="rtl">
برای اجرا کردن کد بر روی سرورهای بکتوری لازم است که این پروژه را به صورت بیلد شده بر روی گیت‌هاب خود منتشر کنید. برای اینکار ابتدا مراحل موجود در تنظیمات اولیه را انجام دهید.
سپس مراحل زیر را انجام دهید:
</div>

### مرحله اول
<div dir="rtl">
در صورتی که این پروژه را با استفاده از دستور git clon دریافت کرده‌اید لازم است ابتدا فولدر .git را از پروژه حذف کنید. در لینوکس با استفاده از دستور زیر اینکار قابل انجام است:
</div>

```bash
cd /path/to/project
rm -rf .git
```

<div dir="rtl">
در صورتی که بر روی ویندوز هستید ابتدا باید با در تنظیمات نمایش فایل‌های مخفی را فعال کنید و سپس فولدر .git را حذف نمایید.
</div>
<div dir="rtl">
در صورتی که در این مرحله با مشکل مواجه شدید می‌توانید به
<a href="http://stackoverflow.com/questions/4754152/git-how-to-remove-git-tracking-from-a-project">
اینجا
</a>
مراجعه کنید.
</div>

### مرحله دوم
<div dir="rtl">
در این مرحله باید فایل .gitignore موجود را با .gitignoreDeploy جایگزین کنید. در لینوکس اینکار با دستور زیر قابل انجام است:
</div>

```bash
cd /path/to/project
mv .gitignore .gitignoreold
mv .gitignoreDeploy .gitignore
```

### مرحله سوم
<div dir="rtl">
در این مرحله لازم است که پروژه موجود را بر روی گیت‌هاب خود ارسال کنید. برای اینکار می‌توانید از
<a href="https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/">
این لینک
</a>
استفاده کنید.
</div>

### مرحله چهارم
<div dir="rtl">
در این مرحله لازم است که جدول‌های مورد نیاز اپلیکیشن را در سرویس بکتوری بسازید. برای اینکار از پنل بکتوری و در قسمت دیتابیس جدول‌های زیر را اضافه کنید. دقت کنید که لازم نیست هیچ ستونی به این جدول‌ها اضافه کنید و تنها اضافه کردن جدول‌ها در بکتوری کافی است.
</div>

```
Movie
UserFavorite
UserInfo
UserRating
```

### مرحله پنجم
<div dir="rtl">
این مرحله مرحله پایانی پروژه است و باید اطلاعات اکانت گیت و لینک پروژه را بر روی پنل بکتوری معلوم کنید و با استفاده از امکان دریافت کد از گیت بکتوری کد خود را بر روی بکتوری منتقل کنید.
</div>


## لینک‌ها

* [درس بر روی مکتب خونه](https://plus.maktabkhooneh.org/course/2/chapters/#info)
* [کلاینت پیاده شده برای سرور](https://github.com/hphamid/maktabkhoone-instagram)

