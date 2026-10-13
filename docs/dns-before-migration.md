# DNS移行前の記録（2026-10-12）

Squarespace Domainsの管理画面で確認。ドメイン登録はSquarespaceに維持する。

| 名前           | 種類  | 値                                     | TTL   |
| -------------- | ----- | -------------------------------------- | ----- |
| @              | A     | 76.76.21.21                            | 14400 |
| www            | CNAME | cname.vercel-dns.com                   | 14400 |
| isymrthtdgxo   | CNAME | gv-xopjadl6nwhly7.dv.googlehosted.com  | 14400 |
| _domainconnect | CNAME | _domainconnect.domains.squarespace.com | 3600  |

管理画面にMX/TXT/AAAA/CAAレコードはなし。公開MX照会もレコードなし。

移行前のネームサーバーは ns-cloud-b1.googledomains.com から ns-cloud-b4.googledomains.com の4台。DNSSECはSquarespaceの画面で有効だった。

復旧時はCloudflare上でWebのA/CNAMEを上記Vercelの値へ戻す。Workers Custom Domainと競合する場合は先に接続を解除する。ドメイン登録やVercelプロジェクトは削除しない。

## Cloudflare側の準備

ゾーンID: `0eee5ec122cbf03e73e98039a70873be`。無料プランで作成し、2026-10-13に有効化を確認。

- `iris.ns.cloudflare.com`
- `randall.ns.cloudflare.com`

既存4レコードをDNSのみで用意済み。自動スキャンで漏れたGoogle所有権確認CNAMEは手動追加した。CloudflareのTTLは自動。

DNSSECの一時解除とDNS移行はユーザー承認済み。2026-10-12 10:49 JSTにSquarespaceで解除し、チェックボックスがオフになったことを確認。10:50 JSTにcomの権威DNS（a.gtld-servers.net）でDSなしを確認した。直前の1.1.1.1のDS応答TTLは86400秒、8.8.8.8は21600秒だった。

## DNS移行の実施（2026-10-13）

- 10:51 JST以降に1.1.1.1と8.8.8.8で旧DSの消失を確認。
- 16:07 JSTにSquarespace Domainsでネームサーバーを `iris.ns.cloudflare.com` と `randall.ns.cloudflare.com` に変更。管理画面の更新成功表示、com親ゾーンと1.1.1.1のNS応答を確認。
- Cloudflareのゾーン有効化を管理画面で確認。Cloudflare権威DNSはapex A `76.76.21.21`、www CNAME `cname.vercel-dns.com` を返す。
- CloudflareでDNSSECを有効化し、Squarespace DomainsにDSレコード（キータグ `2371`、アルゴリズム `13`、ダイジェスト種別 `2`、ダイジェスト `EB5BF172B512B004128339EC3B14787456D4058801A7142E45BD2F61FD864757`）を登録。管理画面に登録成功と同じ値を確認。
- 1.1.1.1と8.8.8.8のDNS-over-HTTPSでapex Aの応答 `AD=true` を確認。DNSSEC検証が成功している。
- `https://www.nakaatsu.com/` はHTTP 200、apexはwwwへのHTTP 308で、どちらもVercelが応答。Webの本番配信先は変更していない。

DNSの委任とDNSSEC復元は完了。WebのCloudflare Workersへの切り替えは別工程とする。再切り替え時はCloudflare上でWebのA/CNAMEを上記Vercelの値へ戻し、Workers Custom Domainが競合する場合は先に接続を解除する。ドメイン登録やVercelプロジェクトは削除しない。

参考: [Cloudflareのフルセットアップ手順](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/)
