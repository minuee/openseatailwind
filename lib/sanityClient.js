import sanityClient from '@sanity/client'

/* export const client = sanityClient({
  projectId: '8pctqxm2',
  dataset: 'production',
  apiVersion: '2022-06-10',
  token:
    'sk24RljcA64Y4Kqx4xdzGkTUcAruVRI5Xnq9fCWUEyAzSIUpaKyfyxQYO80OfVAwFHmmYlPUy3FslkXsFjXBgUCiEyNZKVifFuRD9mwca5kiw9iWhg8DClRQkwyvzjHqTuz4nQW8zOy9TiyGBYKxRZ8KjTDkVu78cLwSzsgBSWdIzpNuCueH',
  useCdn: false,
}) */

export const client = sanityClient({
  projectId: '6gt65pn7',
  dataset: 'production',
  apiVersion: '2021-03-25',
  token:
    'sk4VAMSDZUsc1EbuDNiBMo1wq7LigszPsMq7KxjFm2CIIX4CzVVUzipmrlmrLvlbUtRVQmCLMTkW50qxKFbcEgJsx5a7eTLWBuBmvEIqQ7LVnVQtOxVeKBgGA0t6wUdJ0ZIPkcb9guKebC9F2GIShONj0CbIYrv87PHp7Nc1GMySEunSg1p9',
  useCdn: false,
})
