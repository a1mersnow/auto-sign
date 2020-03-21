
/**
 * ========================== dialogs ===============================
 */

declare namespace dialogs {
  function alert(title: string, content?: string): boolean | Promise<void>
  function alert(title: string, content?: string, callback?: Function): void
  function confirm(title: string, content?: string): boolean | Promise<boolean>
  function confirm(title: string, content?: string, callback?: (flag: boolean) => void): void
  function rawInput(title: string, prefill?: string): string | null | Promise<string | null>
  function rawInput(title: string, prefill?: string, callback?: (value: string | null) => void): void
  function input(title: string, prefill?: string): any | Promise<any>
  function input(title: string, prefill?: string, callback?: (value: any) => void): void
  let prompt: typeof rawInput
  function select(title: string, items: string[]): number | Promise<number>
  function select(title: string, items: string[], callback: (index: number) => void): void
  function singleChoise(title: string, items: string[], index: number): number | Promise<number>
  function singleChoise(title: string, items: string[], index: number, callback: (index: number) => void): void
  function multiChoice(title: string, items: string[], indices: number[]): number[]
  function multiChoice(title: string, items: string[], indices: number[], callback: (indexs: number[]) => void): void

  interface dialogProperties {
    title: string;
    titleColor: string | number;
    buttonRippleColor: string | number;
    icon: string | Image;
    content: string;
    contentColor: string | number;
    contentLineSpacing: number;
    items: string[];
    itemsColor: string | number;
    itemsSelectMode: 'select' | 'single' | 'multi';
    itemSelectedIndex: number | number[];
    positive: string;
    positiveColor: string | number;
    neutral: string;
    neutralColor: string | number;
    negative: string;
    negativeColor: string | number;
    checkBoxPrompt: string;
    checkBoxChecked: boolean;
    progress: {
      max: number;
      horizontal: boolean;
      showMinMax: boolean;
    },
    cancelable: boolean;
    canceledOnTouchOutside: boolean;
    inputHint: string;
    inputPrefill: string;
  }
  interface dialogInstance {
    on(
      event: 'show' | 'cancel' | 'dismiss' | 'positive' | 'negative' | 'neutral',
      callback: (x: dialogInstance) => void
    ): dialogInstance
    on(
      event: 'any',
      callback: (action: 'positive' | 'negative' | 'neutral', x: dialogInstance) => void
    ): dialogInstance
    on(
      event: 'item_select' | 'single_choice',
      callback: (index: number, item: string, dialog: dialogInstance) => void
    ): dialogInstance
    on(
      event: 'multi_choice',
      callback: (indexs: number[], item: string, dialog: dialogInstance) => void
    ): dialogInstance
    on(
      event: 'input' | 'input_change',
      callback: (text: string, dialog: dialogInstance) => void
    ): dialogInstance
    show(): void
    dismiss(): void
    getProgress(): number
    getMaxProgress(): number
    getActionButton(action: 'positive' | 'negative' | 'neutral'): any
  }
  function build(properties: Partial<dialogProperties>): dialogInstance
}

declare const alert: typeof dialogs.alert
