import Card from '~/_components/Card';
import CardHeader from '~/_components/Card/CardHeader';
import MotionWrapper from '~/_components/MotionWrapper';
import ProgressBar from '~/_components/ProgressBar';
import styles from './PrivacyPolicy.module.css';
import Footer from '~/_components/Footer';

const PrivacyPolicy = () => {
  return (
    <MotionWrapper>
      <ProgressBar />
      <Card>
        <CardHeader
          iconPath="/images/privacyPolicy.png"
          iconAlt="privacyPolicy"
          title="Privacy Policy"
        />
        <div className={styles.privacyPolicyContainer}>
          <h1>はじめに</h1>
          当ブログ（以下、「本サイト」といいます。）は、Amazonアソシエイト・プログラムに参加しています。本プライバシーポリシーは、本サイトを利用する際に収集される情報、その利用方法、及びその情報を守るための方法について説明するものです。
          <h2>1. 収集する情報</h2>
          本サイトでは、以下の情報を収集する場合があります。
          <ul>
            <li>
              個人情報:
              本サイトを通じてお問い合わせいただいた際に、氏名やメールアドレスなどの個人情報を収集することがあります。
            </li>
            <li>
              クッキー（Cookie）およびトラッキング技術:
              本サイトでは、Cookieを使用してユーザーの訪問履歴や使用しているブラウザの種類などの情報を収集します。これにより、本サイトのサービス向上や、コンテンツの最適化が図られます。
            </li>
            <li>
              アクセス解析データ:
              Google AnalyticsおよびGoogle Tag Managerを使用して、ページビュー数、滞在時間、ユーザーの行動パターンなどのアクセス解析データを収集しています。
            </li>
          </ul>
          <h2>2. Amazonアソシエイト・プログラムについて</h2>
          本サイトは、第三者によって提供される広告（Amazonアソシエイト）を掲載し、ユーザーがその広告をクリックし、Amazon.co.jpで商品を購入することで報酬を受け取る場合があります。これらの広告リンクは、第三者のアフィリエイトリンクを使用しています。
          <h2>3. 情報の利用方法</h2>
          収集した情報は、以下の目的で利用されます。
          <ul>
            <li>本サイトの運営、管理、サービスの提供</li>
            <li>お問い合わせへの対応</li>
            <li>サイトのコンテンツや広告の最適化</li>
            <li>アクセス解析および利用動向の分析</li>
          </ul>
          <h2>4.情報の共有・提供</h2>
          本サイトでは、収集した情報を第三者に提供することはありません。ただし、法令に基づき開示が必要な場合や、ユーザーの同意がある場合はこの限りではありません。
          <h2>5. クッキーの使用について</h2>
          本サイトでは、Cookieを使用してアクセス情報を記録することがあります。ユーザーは、ブラウザの設定を変更することでCookieの受け入れを拒否することができますが、その場合、本サイトの一部機能が利用できなくなることがあります。
          <h2>6. Google AnalyticsおよびGoogle Tag Managerについて</h2>
          本サイトでは、Google AnalyticsおよびGoogle Tag Managerを使用しています。これらのサービスは、ユーザーのアクセス情報を収集し、サイトの利用状況を分析するために使用されます。Google AnalyticsおよびGoogle Tag Managerの利用規約およびプライバシーポリシーについては、Googleの公式サイトをご確認ください。
          <ul>
            <li>Google Analytics: <a href="https://marketingplatform.google.com/about/analytics/terms/jp/" target="_blank" rel="noopener noreferrer">https://marketingplatform.google.com/about/analytics/terms/jp/</a></li>
            <li>Google Tag Manager: <a href="https://marketingplatform.google.com/intl/ja/about/analytics/tag-manager/use-policy/" target="_blank" rel="noopener noreferrer">https://marketingplatform.google.com/intl/ja/about/analytics/tag-manager/use-policy/</a></li>
          </ul>
          <h2>7. プライバシーポリシーの変更について</h2>
          本サイトは、法令の改正やサービス内容の変更に伴い、本プライバシーポリシーを改定することがあります。改定されたプライバシーポリシーは、本ページに掲載された時点で効力を持ちます。
          <h2>8. お問い合わせ</h2>
          本プライバシーポリシーに関するお問い合わせは、以下の連絡先までお願いいたします。
          <br />
          メールアドレス: nakaatsu0118@gmail.com
        </div>
      </Card>
      <Footer />
    </MotionWrapper>
  );
};

export default PrivacyPolicy;
