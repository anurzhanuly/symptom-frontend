import { error } from './toast';

export function validateClinic(
    name: string,
    city: string,
    address: string
): boolean {
    if (!name) {
        error('Ошибка', "Поле 'Название клиники' должно быть заполнено");
        return false;
    }

    if (!city) {
        error('Ошибка', "Поле 'Поле 'Город' должно быть заполнено");
        return false;
    }

    if (!address) {
        error('Ошибка', "Поле 'Поле 'Адрес' должно быть заполнено");
        return false;
    }

    return true;
}

export function validateLogin(email: string, password: string): boolean {
    if (!email) {
        error('Ошибка', "Поле 'Почта' должно быть заполнено");
        return false;
    }

    if (!password) {
        error('Ошибка', "Поле 'Поле 'Пароль' должно быть заполнено");
        return false;
    }

    return true;
}

export function validatePhone(phone: string) {
    const PHONE_PATTERN = /^(8|\+7|7)[0-9]{10}$/;
    const preparedPhone = phone.replace(/\s/g, '');

    return PHONE_PATTERN.test(preparedPhone)
        ? preparedPhone.replace(/\D/g, '').replace(/^8/, '7')
        : '';
}
