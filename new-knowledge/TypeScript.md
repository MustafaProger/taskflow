# TypeScript

Здесь лежат вопросы про типы, которые встретились в React-компонентах проекта.
Этот файл можно дополнять новыми вопросами по TypeScript.

## Вопросы

1. [Что такое `ReactNode`?](#typescript-q1)

## Ответы

<a id="typescript-q1"></a>
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
