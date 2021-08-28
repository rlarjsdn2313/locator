import random


def get_num():
    return random.randint(1, 6)


def main():
    dices = [0, 0, 0]
    count = 0

    for _ in range(50000):
        for i in range(len(dices)):
            dices[i] = get_num()

        if sum(dices) == 9:
            count +=1 

    print(count)

main()
