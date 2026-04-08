# TypeScript

Здесь лежат вопросы про типы, которые встретились в React-компонентах проекта.
Этот файл можно дополнять новыми вопросами по TypeScript.

## Вопросы

1. [Что такое `ReactNode`?](#typescript-q1)
2. [Как читать `React.TransitionEvent<HTMLSpanElement>`?](#typescript-q2)

## Ответы

### 1. Что такое `ReactNode`?

`React.ReactNode` - это тип, который описывает все, что React умеет показать на экране.

Сюда входят:

- текст
- число
- JSX-элемент
- несколько элементов сразу
- `null`
- `undefined`
- `false`

Чаще всего этот тип используют для `children`.

Пример из проекта:

```tsx
type GlassSurfaceProps = {
  children: React.ReactNode;
};
```

Это значит:
внутрь `GlassSurface` можно передать любой контент, который React умеет отрисовать.

Примеры:

```tsx
<GlassSurface>Привет</GlassSurface>
<GlassSurface>{123}</GlassSurface>
<GlassSurface><button>OK</button></GlassSurface>
```

Важно:
`ReactNode` - это не весь объект `props`.
Это только тот контент, который React умеет рендерить.

Коротко:
если нужно описать "все, что может быть показано внутри компонента", чаще всего подходит `React.ReactNode`.

### 2. Как читать `React.TransitionEvent<HTMLSpanElement>`?

Эта запись относится к TypeScript, потому что мы разбираем тип параметра, а не поведение React во время рендера.

Вот пример:

```tsx
function handleIndicatorTransitionEnd(
  event: React.TransitionEvent<HTMLSpanElement>
) {
  console.log(event.propertyName)
}
```

Такую запись удобно разбирать по частям.

### `React`

`React` здесь - это пространство имен, из которого TypeScript берет типы React.

То есть в `React.TransitionEvent` мы не вызываем React и не создаем компонент.
Мы просто берем тип из React.

Похожие записи:

- `React.MouseEvent`
- `React.ChangeEvent`
- `React.KeyboardEvent`
- `React.TransitionEvent`

### `TransitionEvent`

`TransitionEvent` - это тип события, связанного с CSS transition.

Его используют для обработчиков вроде:

- `onTransitionEnd`
- `onTransitionStart`

То есть здесь `event` - не просто "любое событие", а именно событие перехода.

### `HTMLSpanElement`

`HTMLSpanElement` - это DOM-тип элемента `<span>`.

Эту часть можно понимать так:

- `HTML` - HTML-элемент браузера
- `span` - конкретный тег `<span>`
- `Element` - объект DOM-элемента

Сам `<span>` - это строчный HTML-элемент. Обычно его используют для текста или небольшого фрагмента интерфейса.

### Что значит вся запись целиком

`React.TransitionEvent<HTMLSpanElement>` означает:

- это React-тип события
- событие связано с CSS transition
- событие произошло на элементе `<span>`

Проще читать так:

`event` - это transition-событие для `span`.

### Зачем нужен `<HTMLSpanElement>`

Эта часть уточняет, на каком элементе произошло событие.

Поэтому TypeScript понимает, что:

```ts
event.currentTarget
```

в этом обработчике - именно `HTMLSpanElement`.

Если бы обработчик стоял на другом элементе, тип был бы другим:

```ts
React.TransitionEvent<HTMLButtonElement>
React.TransitionEvent<HTMLDivElement>
```

### Почему не пишут просто `Event`

`Event` - слишком общий тип.

Если написать:

```ts
event: Event
```

то TypeScript будет знать слишком мало о конкретном событии.
Например, он не сможет нормально подсказать специальные поля transition-события:

```ts
event.propertyName
event.elapsedTime
```

### Почему это TypeScript, а не только React

Здесь есть обе темы, но центр вопроса - именно TypeScript.

Почему:

- `onTransitionEnd` и сам обработчик - это React
- запись `event: React.TransitionEvent<HTMLSpanElement>` - это типизация этого обработчика в TypeScript

Поэтому удобно держать в голове такое правило:

- если вопрос про то, когда React вызывает обработчик и что лежит в `event`, это ближе к React
- если вопрос про то, как читать запись вида `React.TransitionEvent<...>`, это ближе к TypeScript

### Коротко

`React.TransitionEvent<HTMLSpanElement>` - это тип объекта события, который React передает в обработчик transition-события у элемента `span`.