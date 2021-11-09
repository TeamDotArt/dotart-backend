import { PrismaClient } from '@prisma/client';
import { objectToJson } from '../src/common/helpers/jsonConverter';

const prisma = new PrismaClient();

// 初期データの追加
async function main() {
  const standardColor = objectToJson({
    color: [
      'rgb(255, 255, 255)',
      'rgb(125, 125, 125)',
      'rgb(0, 0, 0)',
      'rgb(108, 57, 0)',
      'rgb(243, 55, 55)',
      'rgb(212, 110, 229)',
      'rgb(180, 27, 235)',
      'rgb(189, 137, 207)',
      'rgb(150, 150, 215)',
      'rgb(90, 90, 180)',
      'rgb(82, 226, 226)',
      'rgb(137, 255, 146)',
      'rgb(199, 243, 118)',
      'rgb(255, 245, 70)',
      'rgb(255, 195, 100)',
      'rgb(255, 228, 175)',
    ],
  });
  const standard = await prisma.basicPallet.create({
    data: {
      palletId: 'standard',
      name: 'スタンダード',
      description: '使いやすそうな色をまとめてみました。',
      data: standardColor,
    },
  });

  const monoqloColor = objectToJson({
    color: [
      'rgb(255, 255, 255)',
      'rgb(235, 235, 235)',
      'rgb(220, 220, 220)',
      'rgb(205, 205, 205)',
      'rgb(190, 190, 190)',
      'rgb(175, 175, 175)',
      'rgb(160, 160, 160)',
      'rgb(145, 145, 145)',
      'rgb(130, 130, 130)',
      'rgb(115, 115, 115)',
      'rgb(100, 100, 100)',
      'rgb(85, 85, 85)',
      'rgb(70, 70, 70)',
      'rgb(55, 55, 55)',
      'rgb(40, 40, 40)',
      'rgb(0, 0, 0)',
    ],
  });
  const monoqlo = await prisma.basicPallet.create({
    data: {
      palletId: 'monoqlo',
      name: 'モノクロ',
      description: '白黒のグラデーションです。',
      data: monoqloColor,
    },
  });

  const retroGameColor = objectToJson({
    color: [
      'rgb(238, 238, 162)',
      'rgb(238, 238, 162)',
      'rgb(238, 238, 162)',
      'rgb(238, 238, 162)',
      'rgb(186, 200, 112)',
      'rgb(186, 200, 112)',
      'rgb(186, 200, 112)',
      'rgb(186, 200, 112)',
      'rgb(107, 131, 56)',
      'rgb(107, 131, 56)',
      'rgb(107, 131, 56)',
      'rgb(107, 131, 56)',
      'rgb(38, 55, 0)',
      'rgb(38, 55, 0)',
      'rgb(38, 55, 0)',
      'rgb(38, 55, 0)',
    ],
  });
  const retroGame = await prisma.basicPallet.create({
    data: {
      palletId: 'retroGame',
      name: 'レトロゲーム4色',
      description: '当時の4色ディスプレイ風味。',
      data: retroGameColor,
    },
  });

  console.log({ standard, monoqlo, retroGame });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
