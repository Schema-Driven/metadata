import { Module } from '@nestjs/common'
import { ApiAccountDataAccessModule } from '@schema-driven/api/account/data-access'

import { ApiAccountFeatureResolver } from './api-account-feature.resolver'

@Module({
  imports: [ApiAccountDataAccessModule],
  providers: [ApiAccountFeatureResolver],
})
export class ApiAccountFeatureModule {}
