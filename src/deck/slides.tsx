import type { ReactNode } from "react";
import { Pencil, Slash } from "lucide-react";
import { CompareSlider } from "@/deck/CompareSlider";
import { PracticeTimer } from "@/deck/PracticeTimer";
import { media } from "@/deck/media";
import { cn } from "@/lib/utils";

export type SlideDef = {
  id: string;
  title: string;
  notes: string[];
  node: ReactNode;
};

function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="stagger-item font-display text-kicker tracking-[0.28em] text-accent uppercase">
      {children}
    </p>
  );
}

function Photo({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <img src={src} alt={alt} className={cn("h-full w-full object-cover", className)} />
  );
}

function TitleSlide() {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-start justify-between gap-4">
        <Kicker>пробный урок</Kicker>
        <p className="stagger-item text-caption text-muted">12 минут · затем руки в Photoshop</p>
      </div>
      <div>
        <p className="stagger-item font-display text-title leading-snug text-muted">Не талант.</p>
        <h1 className="stagger-item font-display text-hero leading-tight text-fg">Система.</h1>
        <div className="stagger-item mt-6 h-1.5 w-24 bg-accent" />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <p className="stagger-item max-w-xl text-body text-muted">
          Графический дизайн · 3 месяца · Photoshop и Illustrator
        </p>
        <p className="stagger-item text-caption text-muted">
          Пробел — дальше · N — шпаргалка · ? — клавиши
        </p>
      </div>
    </div>
  );
}

function TwoPosters() {
  return (
    <div className="flex h-full flex-col gap-5">
      <div className="flex items-end justify-between gap-4">
        <Kicker>молчать 5 секунд</Kicker>
        <p className="text-caption text-muted">один и тот же вечер</p>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 md:grid-cols-2">
        <article className="poster-bad relative flex h-full min-h-64 flex-col justify-between overflow-hidden p-4 md:min-h-0">
          <p className="text-center text-kicker font-bold tracking-wide">*** SUPER EVENT ***</p>
          <div>
            <p className="burst text-center font-display text-title leading-none">ЛЕТО</p>
            <p className="mt-1 text-center text-body font-extrabold italic">FEST!!!!</p>
          </div>
          <p className="text-center text-caption font-bold">
            15 АВГУСТА!!! ВХОД СВОБОДНЫЙ!!!
            <br />
            DJ / ЕДА / ШАРЫ / ВЕСЕЛЬЕ
          </p>
          <p className="text-center text-kicker font-bold">Звоните 8-800-555</p>
          <span className="badge-new absolute right-3 top-10 rotate-12 px-2 py-1 text-kicker font-black">
            NEW
          </span>
        </article>
        <article className="relative min-h-64 overflow-hidden bg-ink md:min-h-0">
          <Photo src={media.fest} alt="Толпа на вечернем фестивале" />
          <div className="absolute inset-y-0 left-0 w-2 bg-accent" />
          <div className="absolute inset-0 bg-linear-to-t from-bg via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="font-display text-kicker tracking-[0.28em] text-fg uppercase">15 августа</p>
            <p className="font-display text-display leading-tight text-fg">ЛЕТО</p>
          </div>
        </article>
      </div>
    </div>
  );
}

function WhoSlide() {
  const items = [
    { n: "01", t: "Просто посмотреть", d: "Хочу понять, что это такое — и могу ли я." },
    { n: "02", t: "Делать красиво", d: "Для себя, школы, соцсетей, своего дела." },
    { n: "03", t: "Навык всерьёз", d: "Чтобы собирать вещи, которые выглядят взрослыми." },
  ];
  return (
    <div className="flex h-full flex-col justify-between gap-8">
      <div>
        <Kicker>кто в зале</Kicker>
        <h2 className="stagger-item mt-4 font-display text-display leading-tight">Если одно про вас — вы по адресу.</h2>
      </div>
      <ul className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <li key={item.n} className="stagger-item border-t border-line pt-5">
            <p className="font-display text-kicker tracking-[0.2em] text-accent">{item.n}</p>
            <p className="mt-3 font-display text-title leading-snug">{item.t}</p>
            <p className="mt-2 text-body text-muted">{item.d}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NotDrawing() {
  return (
    <div className="flex h-full flex-col justify-between gap-8">
      <Kicker>главный миф</Kicker>
      <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="stagger-item max-w-4xl font-display text-display leading-tight">
          Дизайн — это не рисование.
        </h2>
        <div className="stagger-item relative text-muted">
          <Pencil className="size-24 sm:size-32" strokeWidth={1.25} />
          <Slash className="absolute inset-0 size-24 text-accent sm:size-32" strokeWidth={1.75} />
        </div>
      </div>
      <p className="stagger-item max-w-3xl text-title leading-snug text-muted">
        Вам не нужен дар. Нужно уметь собрать: картинка, текст, цвет, смысл.
      </p>
    </div>
  );
}

function WhereItLives() {
  const cells = [
    { src: media.fest, label: "Афиша" },
    { src: media.vinyl, label: "Обложка" },
    { src: media.stationery, label: "Логотип" },
    { src: media.bottles, label: "Упаковка" },
    { src: media.phone, label: "Сторис" },
  ];
  return (
    <div className="flex h-full flex-col gap-5">
      <div>
        <Kicker>где это живёт</Kicker>
        <h2 className="stagger-item mt-3 font-display text-title leading-snug">Вы смотрите на это каждый день.</h2>
      </div>
      <ul className="grid min-h-0 flex-1 grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {cells.map((cell) => (
          <li key={cell.label} className="stagger-item relative min-h-36 overflow-hidden bg-surface sm:min-h-0">
            <Photo src={cell.src} alt={cell.label} />
            <div className="absolute inset-0 bg-linear-to-t from-bg/90 to-transparent" />
            <p className="absolute bottom-3 left-3 font-display text-body">{cell.label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MythSlide() {
  return (
    <div className="flex h-full flex-col justify-between">
      <Kicker>ещё один миф</Kicker>
      <blockquote className="stagger-item max-w-5xl font-display text-display leading-tight">
        «У меня нет таланта.
        <br />
        Я не творческий.
        <br />
        У меня нет вкуса.»
      </blockquote>
      <p className="stagger-item max-w-3xl text-title leading-snug text-muted">
        Вкус — не дар. Это правила плюс насмотренность. Правила можно выучить.
      </p>
    </div>
  );
}

function TransformSlide() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Kicker>четыре решения</Kicker>
          <h2 className="stagger-item mt-2 font-display text-title leading-snug">Сырое фото → постер.</h2>
        </div>
        <p className="text-caption text-muted">Тяни ползунок</p>
      </div>
      <div className="stagger-item min-h-0 flex-1">
        <CompareSlider src={media.street} alt="Улица вечером, сырое фото" />
      </div>
    </div>
  );
}

function ThreeMonths() {
  const items = [
    { n: "01", t: "Постер", d: "Афиша, которую не стыдно повесить." },
    { n: "02", t: "Логотип", d: "Знак и простой фирменный стиль." },
    { n: "03", t: "Фото", d: "Обработка, после которой кадр звучит как обложка." },
  ];
  return (
    <div className="flex h-full flex-col justify-between gap-8">
      <div>
        <Kicker>через 3 месяца</Kicker>
        <h2 className="stagger-item mt-4 font-display text-display leading-tight">Три вещи в руках. Не теория.</h2>
      </div>
      <ul className="grid gap-8 md:grid-cols-3">
        {items.map((item) => (
          <li key={item.n} className="stagger-item">
            <p className="font-display text-hero leading-none text-accent">{item.n}</p>
            <p className="mt-4 font-display text-title">{item.t}</p>
            <p className="mt-2 text-body text-muted">{item.d}</p>
          </li>
        ))}
      </ul>
      <p className="stagger-item text-body text-muted">Photoshop и Illustrator. С нуля.</p>
    </div>
  );
}

function NotYoutube() {
  const items = [
    { n: "01", t: "10 000 уроков", d: "И ноль дедлайна. Бросают на второй неделе." },
    { n: "02", t: "Некому сказать «плохо»", d: "Без разбора глаз не растёт." },
    { n: "03", t: "Кнопки ≠ дизайн", d: "Заказчику нужно решение, не эффект." },
  ];
  return (
    <div className="flex h-full flex-col justify-between gap-8">
      <div>
        <Kicker>почему не youtube</Kicker>
        <h2 className="stagger-item mt-4 max-w-4xl font-display text-display leading-tight">
          Курс — это глаз, который вам настроят.
        </h2>
      </div>
      <ul className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <li key={item.n} className="stagger-item border-t border-accent pt-5">
            <p className="font-display text-kicker tracking-[0.2em] text-accent">{item.n}</p>
            <p className="mt-3 font-display text-title leading-snug">{item.t}</p>
            <p className="mt-2 text-body text-muted">{item.d}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TodaySlide() {
  return (
    <div className="grid h-full gap-6 lg:grid-cols-2">
      <div className="flex flex-col justify-between">
        <Kicker>сегодня</Kicker>
        <h2 className="stagger-item font-display text-display leading-tight">
          Свой постер. Двадцать минут. Файл унесёте с собой.
        </h2>
        <p className="stagger-item text-body text-muted">
          Потом решите, хотите ли так — 3 месяца, а не 20 минут.
        </p>
      </div>
      <div className="stagger-item relative min-h-56 overflow-hidden bg-surface">
        <Photo src={media.concert} alt="Концерт, референс для постера" />
        <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-5">
          <p className="font-display text-kicker tracking-[0.24em] text-accent uppercase">шаблон готов</p>
          <p className="font-display text-title leading-tight">Ваше имя. Ваше событие.</p>
        </div>
      </div>
    </div>
  );
}

function RulesSlide() {
  const rules = [
    "Не идеально — живо.",
    "Сначала повторяйте, потом крутите своё.",
    "Зависло — рука вверх. Не тонем молча.",
  ];
  return (
    <div className="flex h-full flex-col justify-between gap-8">
      <Kicker>правила практики</Kicker>
      <ol className="flex flex-col gap-6">
        {rules.map((rule, i) => (
          <li key={rule} className="stagger-item flex items-baseline gap-5 border-b border-line pb-5">
            <span className="font-display text-title text-accent tabular-nums">0{i + 1}</span>
            <span className="font-display text-title leading-snug">{rule}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function BelieveSlide() {
  return (
    <div className="flex h-full flex-col justify-between">
      <Kicker>для сомневающихся</Kicker>
      <h2 className="stagger-item max-w-5xl font-display text-display leading-tight">
        Не надо верить мне. Через 20 минут посмотрите на свой экран.
      </h2>
      <p className="stagger-item text-body text-muted">Именно для этого пробник.</p>
    </div>
  );
}

function OpenPs() {
  return (
    <div className="flex h-full flex-col items-start justify-center">
      <Kicker>сейчас</Kicker>
      <h2 className="stagger-item mt-6 font-display text-hero leading-tight">
        Откройте
        <br />
        Photoshop.
      </h2>
    </div>
  );
}

function PracticeSlide() {
  const steps = [
    { t: "0–2 мин", d: "Открыли файл, нашли слои." },
    { t: "2–6 мин", d: "Заголовок — своё имя или событие." },
    { t: "6–11 мин", d: "Подставили картинку из папки." },
    { t: "11–16 мин", d: "Цвет, контраст, один акцент." },
    { t: "16–20 мин", d: "Мелочь: плашка, дата. Сохранили JPEG." },
  ];
  return (
    <div className="flex h-full flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Kicker>практика</Kicker>
          <h2 className="stagger-item mt-2 font-display text-title leading-snug">Постер со своим именем</h2>
        </div>
        <div className="stagger-item">
          <PracticeTimer />
        </div>
      </div>
      <ol className="grid min-h-0 flex-1 gap-3 md:grid-cols-5">
        {steps.map((step, i) => (
          <li key={step.t} className="stagger-item flex flex-col border-t border-line pt-4">
            <p className="font-display text-kicker tracking-[0.18em] text-accent">0{i + 1}</p>
            <p className="mt-3 font-display text-body">{step.t}</p>
            <p className="mt-2 text-caption text-muted">{step.d}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function CloseSlide() {
  return (
    <div className="flex h-full flex-col justify-between gap-8">
      <Kicker>после практики</Kicker>
      <h2 className="stagger-item max-w-5xl font-display text-display leading-tight">
        Это 20 минут с шаблоном. Курс — 3 месяца, чтобы собирать так с нуля.
      </h2>
      <div className="stagger-item flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-xl text-body text-muted">
          Кто хочет место в первом потоке — запись у администратора. Сегодня за пробником места держат.
        </p>
        <p className="font-display text-title text-accent">Запись здесь.</p>
      </div>
    </div>
  );
}

export const slides: SlideDef[] = [
  {
    id: "title",
    title: "Не талант. Система.",
    notes: [
      "Не представляйся долго. Имя — одно предложение, если нужно.",
      "Пауза после слова «Система».",
      "«Сегодня вы поймёте, можете ли вы это делать. Спойлер: да.»",
      "На проекторе шпаргалку (N) выключи.",
    ],
    node: <TitleSlide />,
  },
  {
    id: "posters",
    title: "Один и тот же вечер",
    notes: [
      "Молчи 5 секунд. Пусть сами увидят разницу.",
      "Потом: «Разница не в бюджете. В человеке, который это собрал.»",
      "«Через 20 минут это будете вы.»",
    ],
    node: <TwoPosters />,
  },
  {
    id: "who",
    title: "Кто в зале",
    notes: [
      "Не делай круг знакомств.",
      "Прочитай три строки. «Если хотя бы одно про вас — вы по адресу.»",
    ],
    node: <WhoSlide />,
  },
  {
    id: "drawing",
    title: "Это не рисование",
    notes: [
      "Сними главный страх: «я не умею рисовать».",
      "«Дизайнер собирает. Картинка, текст, цвет, смысл.»",
      "«Этому учат. Как вождению. Не как дару.»",
    ],
    node: <NotDrawing />,
  },
  {
    id: "where",
    title: "Где это живёт",
    notes: [
      "Пройдись пальцем по пяти кадрам. Не лей теорию.",
      "«Кто-то это сделал. Сегодня попробуете вы.»",
    ],
    node: <WhereItLives />,
  },
  {
    id: "myth",
    title: "Нет вкуса",
    notes: [
      "Произнеси возражения вслух, пока они крутятся в зале.",
      "«Вкус — насмотренность плюс правила. Правила — на курсе.»",
    ],
    node: <MythSlide />,
  },
  {
    id: "transform",
    title: "Сырое → постер",
    notes: [
      "Медленно тяни ползунок. Говори вслух: фото. Темнее. Контраст. Текст.",
      "«Это не гений. Четыре решения.»",
      "Если успеваешь — 60 секунд в Photoshop на проекторе. Если нет — этого хватит.",
    ],
    node: <TransformSlide />,
  },
  {
    id: "months",
    title: "3 месяца",
    notes: [
      "Не читай программу. Три артефакта.",
      "«Три месяца. Photoshop и Illustrator. От нуля.»",
      "Про два раза в неделю не говори — это администраторы.",
    ],
    node: <ThreeMonths />,
  },
  {
    id: "youtube",
    title: "Не YouTube",
    notes: [
      "Не ругай интернет. Продай редактуру глаза и дедлайн.",
      "«Курс — не кнопки. Это человек, который скажет: вот здесь плохо.»",
    ],
    node: <NotYoutube />,
  },
  {
    id: "today",
    title: "Сегодня",
    notes: [
      "Покажи, что сейчас будет победа в руках, не ещё слайды.",
      "«Унесёте файл. Потом решите.»",
    ],
    node: <TodaySlide />,
  },
  {
    id: "rules",
    title: "Правила",
    notes: [
      "Коротко, по-дружески, без учителя-надзирателя.",
      "Сильные не получают отдельное задание. Все делают одно.",
    ],
    node: <RulesSlide />,
  },
  {
    id: "believe",
    title: "Не верьте мне",
    notes: ["Одна фраза. Пауза. Дальше — чёрный слайд и Photoshop."],
    node: <BelieveSlide />,
  },
  {
    id: "open",
    title: "Откройте Photoshop",
    notes: [
      "Скажи строку и иди между рядами.",
      "Помоги открыть файл. Не стой у ноутбука.",
    ],
    node: <OpenPs />,
  },
  {
    id: "practice",
    title: "Практика 20 минут",
    notes: [
      "Этот слайд держи на проекторе все 20 минут.",
      "Старт таймера. Шаги вслух по минутам.",
      "В конце: Print Screen / JPEG в телефон.",
    ],
    node: <PracticeSlide />,
  },
  {
    id: "close",
    title: "Запись",
    notes: [
      "Покажи 3–4 работы с разных возрастов. Хвали решение, не талант.",
      "Прочитай закрытие. Кивок администратору. Не торгуйся и не говори «подумайте».",
    ],
    node: <CloseSlide />,
  },
];
