#### Firebase Test Credentials

```

```

#### Requirements

1. NodeJS v10.18.0
2. npm v6.13.4

#### Setup Development Environment variables

Run all comands on terminal:

Development

```
firebase functions:config:set development.type="service_account"
firebase functions:config:set development.project_id="proyecto-base-6c214"
firebase functions:config:set development.private_key_id="670058efe13d0f2a36e3a41754b4fd7309deb1b7"
firebase functions:config:set development.private_key="-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCVYPoNIPXRfxQl\nULKr/lbaWYnXicH3wy208FoUfISOC8PjDlbyMDa74MNII+JRX8Kum3BKWCUYperU\nH3lPMc4uc2EgfbeZTnbfrKEvHVL7RufsL9OARdj9q2IWCD34uWawFIoyeWLWcuVv\njMN3TfzjWuF87IRQ7T1v36W/OIDUzsAGY0EFnBEp051UjKSfg92tT1SUQM/iKdK3\nmdM72dYUBjdQ+3LXTxNrcupb56wBeTPXEyRWIoId0O0vuFD5qzQbREVB2Qj8fyaK\nRV42QotpEBg6TKoawhCYnVnogaj+GG2t1ocyz8yDyfahUoSDGdOZEOZREe7hxLJv\nSRGxAlDBAgMBAAECggEAAISEz9At2WXNMvYXrSpgLHTw0hRgpa9De5z1TTS3cnEB\nhvo7km6wzx3Fu/iXvQMrzO5R/0A1ClPffYBJm7jiGmOjABtu7B4ZOeQcpbHCdgdt\nU/p4Q02cqXABRrb9AN1SvQKgdilo/oH41Aot+oowqZSY30mQGaIhlUtWQRhu6/vd\nQxwxCySC8nQv3G1+31NzhSyxLqLzCulzqSDebhVxBVZym3mnwI9PGqDp+b1VGdVg\nijTU8151Ghj270Wdx78L+/k15nLA9VlDlKzykBIGdsdLCgnyPXg2lSWaxdPXn6wh\ngOnzmG+dFY1RDSOmugH4LHhHtGPZzk38NFNi7TrTgQKBgQDSgrrKd773foeuga1X\nHr8lZzUMhgKeIBJIFmruzYedy6MvFPLQBfudGDyJwcL0GE3i/lzEvSSa93kI4qF5\n6nLaQEolw5UqqTPFMcosIPP6FkRuLlxa5D/HnI3D6YKUlNMoLtlTPURPoNyolhzT\nVPfcjQqwl75b4dUqPtQuNT9QgQKBgQC1qHxGn44hMYw3ZkaUa0A3j0FZa8/FvNB/\nkQjIeu+PIhRdlZR0AeK3DS6Lr4xEU1zzOq1+6mC5oStiMaljllP40m05Juiv8QMA\nVTDmpUd73QwD2Wghg8+HOhfQQ818EBMtLOTsFdt/PGfKQ0V7vYZ8wqGsgXMOYJm7\nBW6iJn7gQQKBgD44q9Nqf4SR3rLi24RzrxX0Iob4GU/5tM2f6q15DIvEhBBHhdmc\n2xk876/cGK6jfGoKuwrfyTEQ0rKgog/yD06ZUBFHdRCuAIJZzCMs/lA+Qq26gEvR\nSVTL3k849wLJ1nv7FPt4kXdj2bTu4chJRhXnjnBR+c8YujQJbBfYX0WBAoGADqYw\np21Ug97ABPOte2iOvCxEQ9bK4ZJRaggjIi+vw+YmqElYuGYyhzp7523XrObgFwlD\nVnnGJRIXMor4svw7d1RY1IQLvax85nj4QZFQi2+O+Xx9xj4f7TLFGtls57VQJpN5\nPoSgt8kCQbBdGRZ2kvcLHKMvyRgHLarJejAKiUECgYAY1qSD1/T3LivMmjLfhAMm\nYJ7gcxDQlRompSRm3ePfwIcKMRGZPglf+Nl21OhvFYOnCZMzThZyoZhBEQB3KgD1\nvbkZJWr+L6PddK5YP0KdRKc3/P0s6h/paaes8qQL8TGB8GFS9AMbqsDOUoH8YNmr\nmZPAlDew3cm6mOtE++20AQ==\n-----END PRIVATE KEY-----\n"
firebase functions:config:set development.client_email="firebase-adminsdk-pcxs3@proyecto-base-6c214.iam.gserviceaccount.com"
firebase functions:config:set development.client_id="116078889018083841836"
firebase functions:config:set development.auth_uri="https://accounts.google.com/o/oauth2/aut"
firebase functions:config:set development.token_uri="https://oauth2.googleapis.com/token"
firebase functions:config:set development.auth_provider_x509_cert_url="https://www.googleapis.com/oauth2/v1/certs"
firebase functions:config:set development.client_x509_cert_url="https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-pcxs3%40proyecto-base-6c214.iam.gserviceaccount.com"
firebase functions:config:set development.storage_bucket="proyecto-base-6c214.appspot.com"
firebase functions:config:set development.sendgrid_key="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"

```

Mac,Linux => `firebase functions:config:get > .runtimeconfig.json`

Windows => `firebase functions:config:get | ac .runtimeconfig.json`

#### Get all Environment variables

`firebase functions:config:get`

#### Work on API

1. Change files into app directory
2. run `yarn build` on terminal (inside root directory)
3. run `firebase server` on terminal
