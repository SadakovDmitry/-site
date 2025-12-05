# 🔧 Исправление проблемы с маршрутизацией React Router

## Проблема
При прямом открытии URL (например, `/news` или `/fond`) вместо главной страницы показывается ошибка 404.

## Причина
React Router использует HTML5 History API. Когда пользователь открывает URL напрямую, сервер ищет физический файл по этому пути, но его нет - это только маршрут в React Router.

## Решение

Я создал файлы для разных типов хостингов. Выберите решение в зависимости от вашего хостинга:

---

## 🌐 Вариант 1: Nginx (ваш случай)

### Проверка текущей конфигурации:

1. **Проверьте, что конфигурация Nginx активна:**
   ```bash
   sudo nginx -t
   ```

2. **Проверьте, что используется правильный конфиг:**
   ```bash
   # Найдите активный конфиг для вашего домена
   ls -la /etc/nginx/sites-enabled/
   ls -la /etc/nginx/conf.d/
   ```

3. **Убедитесь, что в конфиге есть:**
   ```nginx
   location / {
       try_files $uri $uri/ /index.html;
   }
   ```

4. **Если конфигурация не применена:**
   ```bash
   # Скопируйте конфиг
   sudo cp nginx-frsrk.conf /etc/nginx/sites-available/frsrk.ru

   # Создайте симлинк
   sudo ln -s /etc/nginx/sites-available/frsrk.ru /etc/nginx/sites-enabled/

   # Проверьте конфигурацию
   sudo nginx -t

   # Перезагрузите Nginx
   sudo systemctl reload nginx
   ```

---

## 🌐 Вариант 2: Apache

Если у вас Apache, файл `.htaccess` уже создан в папке `public/` и будет автоматически скопирован в `build/` при сборке.

**Проверьте:**
1. Убедитесь, что модуль `mod_rewrite` включен:
   ```bash
   sudo a2enmod rewrite
   sudo systemctl restart apache2
   ```

2. Убедитесь, что в конфиге Apache разрешены `.htaccess` файлы:
   ```apache
   <Directory /var/www/html>
       AllowOverride All
   </Directory>
   ```

---

## 🌐 Вариант 3: Netlify

Файл `_redirects` уже создан в папке `public/` и будет автоматически скопирован в `build/`.

Никаких дополнительных действий не требуется - Netlify автоматически использует этот файл.

---

## 🌐 Вариант 4: Vercel

Файл `vercel.json` уже создан в корне проекта.

Никаких дополнительных действий не требуется - Vercel автоматически использует этот файл.

---

## 🌐 Вариант 5: Другие хостинги

### Для статического хостинга (GitHub Pages, Firebase Hosting и т.д.):

Создайте файл `404.html` в папке `build/` с содержимым `index.html`:

```bash
cp build/index.html build/404.html
```

---

## ✅ Проверка после применения

1. **Пересоберите проект:**
   ```bash
   npm run build
   ```

2. **Проверьте, что файлы скопированы:**
   ```bash
   # Для Apache
   ls -la build/.htaccess

   # Для Netlify
   ls -la build/_redirects
   ```

3. **Протестируйте:**
   - Откройте сайт напрямую по URL: `https://ваш-домен.ru/news`
   - Должна открыться страница новостей, а не ошибка 404

---

## 🔍 Диагностика проблем

### Если все еще не работает:

1. **Проверьте логи Nginx:**
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```

2. **Проверьте, что файлы в build/ на месте:**
   ```bash
   ls -la /var/www/sites/frsrk-website/build/
   ```

3. **Проверьте права доступа:**
   ```bash
   sudo chown -R www-data:www-data /var/www/sites/frsrk-website/build/
   sudo chmod -R 755 /var/www/sites/frsrk-website/build/
   ```

4. **Очистите кэш браузера:**
   - Нажмите `Ctrl+Shift+R` (Windows/Linux) или `Cmd+Shift+R` (Mac)

---

## 📝 Важные замечания

- Файлы `.htaccess` и `_redirects` автоматически копируются из `public/` в `build/` при сборке
- После изменения конфигурации Nginx всегда проверяйте синтаксис: `sudo nginx -t`
- После изменений перезагружайте Nginx: `sudo systemctl reload nginx`

---

**Если проблема осталась, пришлите:**
1. Тип вашего хостинга (Nginx/Apache/Netlify/Vercel/другой)
2. Вывод команды `sudo nginx -t` (если Nginx)
3. Логи ошибок из браузера (F12 → Console)

