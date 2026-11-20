// Theme toggle. The initial theme is set inline in <head> to avoid a flash.
(function () {
    var root = document.documentElement;
    var btn = document.querySelector('.theme-btn');
    if (!btn) return;
    var label = btn.querySelector('.theme-text');

    function sync() {
        var next = root.dataset.theme === 'light' ? 'Dark mode' : 'Light mode';
        if (label) label.textContent = next;
        btn.setAttribute('aria-label', 'Switch to ' + next.toLowerCase());
    }

    btn.addEventListener('click', function () {
        root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
        try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
        sync();
    });
    sync();
})();

// Contact form, sent through EmailJS.
(function () {
    var form = document.getElementById('contact-form');
    if (!form) return;
    var status = document.getElementById('form-status');

    function show(text, isError) {
        status.textContent = text;
        status.classList.toggle('error', !!isError);
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var data = {
            from_name: form.name.value.trim(),
            email_id: form.email.value.trim(),
            subject: form.subject.value.trim(),
            message: form.message.value.trim()
        };

        if (!data.from_name || !data.email_id || !data.subject || !data.message) {
            return show('Fill in your name, email, subject and message.', true);
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email_id)) {
            return show('Enter an email address like name@example.com.', true);
        }
        if (!window.emailjs) {
            return show('The form could not load. Email me at mliloadrian17@gmail.com instead.', true);
        }

        var button = form.querySelector('button[type="submit"]');
        button.disabled = true;
        show('Sending your message...');

        emailjs.send('service_smka4zt', 'template_ufqu2tj', data, 'F55z98qKXVNv5QcBt')
            .then(function () {
                form.reset();
                window.location.href = 'thanks.html';
            })
            .catch(function () {
                button.disabled = false;
                show('Your message was not sent. Try again, or email me at mliloadrian17@gmail.com.', true);
            });
    });
})();
