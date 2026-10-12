# DNS移行前の記録（2026-10-12）

Squarespace Domainsの管理画面で確認。ドメイン登録はSquarespaceに維持する。

| 名前           | 種類  | 値                                     | TTL   |
| -------------- | ----- | -------------------------------------- | ----- |
| @              | A     | 76.76.21.21                            | 14400 |
| www            | CNAME | cname.vercel-dns.com                   | 14400 |
| isymrthtdgxo   | CNAME | gv-xopjadl6nwhly7.dv.googlehosted.com  | 14400 |
| _domainconnect | CNAME | _domainconnect.domains.squarespace.com | 3600  |

管理画面にMX/TXT/AAAA/CAAレコードはなし。公開MX照会もレコードなし。

既存ネームサーバーは ns-cloud-b1.googledomains.com から ns-cloud-b4.googledomains.com の4台。DNSSECはSquarespaceの画面で有効。切り替え前に旧DSの取り扱いを確認し、移行後にCloudflareのDNSSECで保護を復元する。現時点では変更していない。

復旧時はCloudflare上でWebのA/CNAMEを上記Vercelの値へ戻す。Workers Custom Domainと競合する場合は先に接続を解除する。ドメイン登録やVercelプロジェクトは削除しない。

## Cloudflare側の準備

ゾーンID: `0eee5ec122cbf03e73e98039a70873be`。無料プランで作成、状態はpending。

- `iris.ns.cloudflare.com`
- `randall.ns.cloudflare.com`

既存4レコードをDNSのみで用意済み。自動スキャンで漏れたGoogle所有権確認CNAMEは手動追加した。CloudflareのTTLは自動。公開委任はまだSquarespaceの旧ネームサーバーを維持している。

DNSSECの一時解除とDNS移行はユーザー承認済み。2026-10-12 10:49 JSTにSquarespaceで解除し、チェックボックスがオフになったことを確認。10:50 JSTにcomの権威DNS（a.gtld-servers.net）でDSなしを確認した。一方、直前の1.1.1.1のDS応答TTLは86400秒、8.8.8.8は21600秒だったため、ネームサーバー変更は少なくとも2026-10-13 10:51 JST以降にDS消失を再確認してから行う。解除後は親ゾーンのDS消失とキャッシュの失効を確認してからNSを変更する。切り替え後はCloudflareで発行したDSをSquarespaceへ登録し、DNSSEC検証を再確認する。

参考: [Cloudflareのフルセットアップ手順](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/)
