import { createSeedClient } from '@snaplet/seed';
import { faker } from '@snaplet/copycat';

const main = async () => {

  const seed = await createSeedClient({
    dryRun: true,
  });

  await seed.$resetDatabase()

  const {tags} = await seed.tags(x => x(20), {
    models: {
      tags: {
        data: {
          value: () => faker.string.alpha({casing: "lower", length: faker.number.int(10) + 1}),
        }
      }
    }
  });

  await seed.posts(x => x(10), {
    models: {
      posts: {
        data: {
          tags: () => {
            const bound1 = faker.number.int(tags.length);
            const bound2 = faker.number.int(tags.length);
            return tags.slice(Math.min(bound1, bound2), Math.max(bound1, bound2)).map(tag => tag.value);
          },
        }
      }
    }
  });

  process.exit();
}

main();
