#include <iostream>
#include <string>
#include <vector>

int foo[20];
int fooLength = 10;
const int maxFooLength = std::end(foo) - std::begin(foo);
int storage = 0;
int other_cell = 0;

bool scramblethearray() {
	for (int i = 0; i < fooLength; i++)
	{
		other_cell = rand() % fooLength;
		storage = foo[other_cell];
		foo[other_cell] = foo[i];
		foo[i] = storage;
	}
	return true;
}

bool checkthearray() {
	int previousnumber = 0;
	int i = 0;
	while (i<fooLength){
		if (previousnumber <= foo[i]) {
			previousnumber = foo[i];
			i++;
			continue;
		}
		else {
			return false;
		}
	}
	return true;
}

int main() {
	while (fooLength < maxFooLength) {
		std::cout << "bogosorting array of " << fooLength << " length." << std::endl;
		for (int i = 0; i < fooLength; i++)
		{
			foo[i] = rand() % 90+10;
		}
		int timestobogo = 0;
		while (!checkthearray()) {
			scramblethearray();
			timestobogo++;
		}
		for (int i = 0; i < fooLength; i++)
		{
			std::cout << foo[i] << " ";
		}
		std::cout << std::endl << "bogosort took " << timestobogo<<" passes"<< std::endl;
		std::cout << "10^" << log10(timestobogo) << std::endl<< std::endl;
		//fooLength++;
	}
}