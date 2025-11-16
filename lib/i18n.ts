export const defaultLocale = 'ru' as const;
export const locales = ['ru', 'ro'] as const;

export type Locale = (typeof locales)[number];

export const translations = {
  ru: {
    nav: {
      home: 'Главная',
      constructor: 'Конструктор',
      catalog: 'Каталог',
      priceList: 'Прайс-лист',
      about: 'О нас',
      contact: 'Контакты',
    },
    home: {
      title: 'VIP-RAMKA.MD',
      tagline: 'Премиум',
      premium: 'Премиум',
      createFrame: 'Создать рамку',
      contactUs: 'Связаться с нами',
      hero: {
        title: 'Премиальные рамки',
        subtitle:
          'Создайте уникальную рамку для автомобильного номера. Качество, эксклюзивность и мастерство для истинных ценителей.',
      },
      features: {
        premium: 'Премиум качество',
        durability: 'Долговечность',
        fast: 'Быстрое изготовление',
      },
    },
    constructor: {
      title: 'Конструктор рамок',
      customize: 'Настроить рамку',
      preview: 'Предварительный просмотр',
    },
    order: {
      title: 'Оформить заказ',
      phone: 'Номер телефона',
      product: 'Выберите продукт',
      submit: 'Отправить заказ',
    },
  },
  ro: {
    nav: {
      home: 'Acasă',
      constructor: 'Constructor',
      catalog: 'Catalog',
      priceList: 'Lista de preturi',
      about: 'Despre noi',
      contact: 'Contact',
    },
    home: {
      title: 'VIP-RAMKA.MD',
      tagline: 'Premium',
      premium: 'Premium',
      createFrame: 'Creează ramă',
      contactUs: 'Contactează-ne',
      hero: {
        title: 'Rame Premium',
        subtitle:
          'Creează o ramă unică pentru plăcuța de înmatriculare. Calitate, exclusivitate și măiestrie pentru adevărații cunoscători.',
      },
      features: {
        premium: 'Calitate premium',
        durability: 'Durabilitate',
        fast: 'Producție rapidă',
      },
    },
    constructor: {
      title: 'Constructor rame',
      customize: 'Personalizează rama',
      preview: 'Previzualizare',
    },
    order: {
      title: 'Plasează comanda',
      phone: 'Numărul de telefon',
      product: 'Selectează produsul',
      submit: 'Trimite comanda',
    },
  },
} as const;
